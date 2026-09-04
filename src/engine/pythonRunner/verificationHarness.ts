/**
 * Harness Python usado na verificação.
 *
 * Fica como string separada por dois motivos: o arquivo do Worker continua
 * legível, e este código é longo o bastante para merecer ser lido como Python
 * de verdade — inclusive com destaque de sintaxe em editores que reconhecem a
 * marcação `python` do template.
 *
 * Contrato: define `_magnolia_verify(source, spec_json) -> str` (JSON).
 *
 * Decisões que o harness implementa:
 *
 * - **Namespace limpo por caso.** Cada caso executa o código do aluno em um
 *   dicionário de globais recém-criado. Nada sobrevive de uma execução livre
 *   anterior, de outra tentativa ou do caso anterior. O runtime do Pyodide
 *   continua carregado — o que é descartado é o namespace, não o interpretador.
 *
 * - **Entrada injetada no namespace, nunca no código.** As `initialVariables`
 *   de um caso de script entram como chaves desse dicionário antes do `exec`.
 *   Nada é concatenado antes do código do aluno: o texto compilado é exatamente
 *   o que ele escreveu, então a linha apontada por um SyntaxError ou por um
 *   traceback continua sendo a linha que ele vê no editor. Cada caso recebe uma
 *   cópia profunda dos valores, para que um script que altere a lista recebida
 *   não contamine o caso seguinte.
 *
 * - **Falha global antes dos casos.** O código é compilado uma vez; se não
 *   compila, nenhum caso roda. Depois é executado uma vez em modo sonda: se
 *   levantar erro já no nível do módulo, isso é uma falha de execução, e não
 *   cinco casos reprovados. A sonda usa a entrada do primeiro caso — sem ela,
 *   um script que depende de uma variável injetada levantaria `NameError` e
 *   nenhum caso chegaria a rodar.
 *
 * - **Valores etiquetados.** Todo valor volta como {"type": ..., ...} em vez do
 *   valor cru, para que a comparação aconteça em TypeScript.
 */
export const VERIFICATION_HARNESS = `
import contextlib
import copy
import io
import json
import math
import sys
import traceback


def _magnolia_encode(value):
    if value is None:
        return {"type": "none"}

    if isinstance(value, bool):
        return {"type": "bool", "value": value}

    if isinstance(value, int):
        return {"type": "int", "value": value}

    if isinstance(value, float):
        if math.isnan(value):
            return {"type": "float", "value": None, "special": "nan"}
        if math.isinf(value):
            return {"type": "float", "value": None, "special": "inf" if value > 0 else "-inf"}
        return {"type": "float", "value": value}

    if isinstance(value, str):
        return {"type": "str", "value": value}

    if isinstance(value, (list, tuple)):
        kind = "list" if isinstance(value, list) else "tuple"
        return {"type": kind, "items": [_magnolia_encode(item) for item in value]}

    # NumPy só é considerado quando o próprio código do aluno já o importou;
    # o harness nunca provoca o import.
    numpy = sys.modules.get("numpy")

    if numpy is not None:
        if isinstance(value, numpy.ndarray):
            return {
                "type": "ndarray",
                "dtype": str(value.dtype),
                "items": [_magnolia_encode(item) for item in value.tolist()],
            }
        if isinstance(value, numpy.generic):
            return _magnolia_encode(value.item())

    return {"type": "unsupported", "display": repr(value), "pythonType": type(value).__name__}


def _magnolia_decode_argument(value):
    # Marcador declarado pelo conteúdo para argumentos que precisam ser arrays.
    if isinstance(value, dict) and value.get("kind") == "ndarray":
        import numpy

        return numpy.array(value["items"])

    return value


def _magnolia_fresh_globals(initial_variables=None):
    # O estado inicial entra como chave deste dicionário — o código do aluno
    # nunca é alterado para receber a entrada. A cópia isola os casos entre si:
    # um script que faça valores.append(...) não altera o que o próximo recebe.
    namespace = {"__name__": "__main__", "__builtins__": __builtins__}

    for name, value in (initial_variables or {}).items():
        namespace[name] = copy.deepcopy(_magnolia_decode_argument(value))

    return namespace


def _magnolia_verify(source, spec_json):
    spec = json.loads(spec_json)

    try:
        compiled = compile(source, "<exec>", "exec")
    except SyntaxError:
        return json.dumps({"outcome": "execution-error", "traceback": traceback.format_exc()})

    # Sonda: confirma que o código roda antes de julgar qualquer caso. Usa a
    # entrada do primeiro caso, senão um script que dependa de uma variável
    # injetada falharia aqui antes de qualquer caso ser avaliado.
    first_case = spec["cases"][0] if spec["cases"] else {}
    probe_globals = _magnolia_fresh_globals(first_case.get("initialVariables"))
    try:
        with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
            exec(compiled, probe_globals)
    except BaseException:
        return json.dumps({"outcome": "execution-error", "traceback": traceback.format_exc()})

    if spec["mode"] == "function":
        candidate = probe_globals.get(spec["entryPoint"])
        if not callable(candidate):
            return json.dumps({"outcome": "missing-entry-point", "entryPoint": spec["entryPoint"]})

    observations = []

    for case in spec["cases"]:
        namespace = _magnolia_fresh_globals(case.get("initialVariables"))
        stdout = io.StringIO()
        observation = {"id": case["id"]}

        try:
            with contextlib.redirect_stdout(stdout), contextlib.redirect_stderr(io.StringIO()):
                exec(compiled, namespace)

                if spec["mode"] == "function":
                    function = namespace.get(spec["entryPoint"])
                    if not callable(function):
                        observation["missingEntryPoint"] = True
                    else:
                        arguments = [_magnolia_decode_argument(item) for item in case["args"]]
                        observation["returned"] = _magnolia_encode(function(*arguments))
                else:
                    observation["variables"] = {
                        name: (_magnolia_encode(namespace[name]) if name in namespace else None)
                        for name in case["variableNames"]
                    }
        except BaseException:
            observation["traceback"] = traceback.format_exc()

        observation["stdout"] = stdout.getvalue()
        observations.append(observation)

    return json.dumps({"outcome": "observed", "cases": observations})


def _magnolia_namespace(initial_json):
    # Usado pela execução livre: o botão Executar roda o código do aluno com o
    # mesmo estado inicial do primeiro caso, para que explorar e verificar
    # partam dos mesmos valores.
    return _magnolia_fresh_globals(json.loads(initial_json))
`
