# Arquitetura do Magnolia

## 1. Objetivo

Este documento descreve a arquitetura técnica do Magnolia.

A arquitetura deve permitir que o produto comece simples, frontend-only, mas possa evoluir sem exigir uma reescrita completa.

Os principais domínios do sistema são:

- conteúdo educacional;

- interface;

- execução de código;

- avaliação;

- feedback;

- progresso.

---

## 2. Princípios

A arquitetura deve priorizar:

- simplicidade;

- separação de responsabilidades;

- baixo acoplamento;

- tipagem explícita;

- conteúdo separado da interface;

- facilidade para adicionar exercícios;

- facilidade para adicionar novas tecnologias no futuro.

Evitar abstrações criadas apenas para antecipar problemas que ainda não existem.

---

## 3. Arquitetura de alto nível

O fluxo conceitual principal é:

    Conteúdo

       ↓

    Página de exercício

       ↓

    Editor

       ↓

    Python Runner

       ↓

    Test Runner

       ↓

    Evaluator

       ↓

    Feedback

       ↓

    Progress

Cada camada deve possuir responsabilidade clara.

### Implementação atual

Na Fase 1, o catálogo carrega aulas e exercícios declarativos com
`import.meta.glob` em modo eager. A navegação usa a History API do navegador,
sem dependência de roteamento. O progresso mínimo é centralizado e registra
somente aulas visualizadas (`viewedLessonIds`) e exercícios iniciados
(`startedExerciseIds`); tentativas, conclusão e métricas completas continuam
previstas para a Fase 4.

Na Fase 2, a página de exercício ganhou editor e execução: Monaco carregado sob
demanda e Pyodide dentro de um Web Worker.

Na Fase 3, o ciclo se fechou. O exercício declara casos de teste, o test runner
os executa, o evaluator interpreta o resultado e a interface apresenta o
feedback. Falta apenas o registro de conclusão, previsto para a Fase 4:
verificar diz o que aconteceu nesta tentativa, e não persiste nada.

Ao publicar a aplicação em hospedagem estática, o host deve redirecionar rotas
profundas para `index.html`. Essa configuração de deploy não faz parte da Fase 1.

---

## 4. Conteúdo

O conteúdo educacional vive fora dos componentes React.

Diretórios:

    content/programming/

    content/data-science/

Cada trilha contém:

    lessons/

    exercises/

O objetivo é permitir que novos exercícios sejam adicionados principalmente através de novos arquivos de conteúdo.

Componentes React não devem possuir enunciados, soluções ou testes específicos hardcoded.

---

## 5. Modelo de domínio

Os principais tipos deverão ser definidos em:

    src/types/

Entidades conceituais esperadas incluem:

### Lesson

Representa conteúdo didático.

Pode conter:

- id;

- título;

- trilha;

- tópico;

- nível;

- objetivos;

- conceito;

- seções de explicação;

- exercícios relacionados.

A explicação é uma lista de `LessonSection` — título, parágrafos e exemplos
opcionais — em vez de um texto corrido com uma galeria de exemplos no fim. Assim
o autor alterna teoria e exemplo quantas vezes o conceito exigir, e a página
renderiza o que existir sem conhecer o assunto.

### Exercise

Representa um desafio executável.

Pode conter:

- id;

- título;

- trilha;

- tópico;

- dificuldade;

- modo de execução;

- descrição;

- instruções;

- starterCode;

- exemplos;

- hints;

- testes;

- metadados.

#### Modos de execução

`Exercise` é uma união discriminada por `executionMode`:

    ScriptExercise    executionMode: 'script'
    FunctionExercise  executionMode: 'function' + entryPoint: string

Um exercício de script é código escrito de cima para baixo, avaliado pela saída
do programa. Um exercício de função pede a implementação da função nomeada em
`entryPoint`.

A união existe para que `entryPoint` só exista onde faz sentido: um exercício de
script não tem como declará-lo, e a Fase 3 será obrigada pelo compilador a
tratar os dois casos em vez de assumir que todo exercício é uma função.

O tópico controla o que é permitido. `Topic.unlocksExecutionMode` marca a partir
de onde exercícios de função são aceitos na trilha, e o catálogo recusa um
exercício de função em tópico anterior a esse. A progressão pedagógica que
sustenta essa regra está em `docs/PROGRAMMING_CURRICULUM.md`.

### TestCase

Representa um caso utilizado para avaliar a solução.

O formato acompanha o modo de execução do exercício, pela mesma união
discriminada:

    ScriptTestCase    label + initialVariables + expectedStdout e/ou expectedVariables
    FunctionTestCase  args + expected (+ tolerance)

Um caso de script não tem como declarar `args`, e um caso de função não tem como
declarar `expectedStdout` no lugar do retorno. Ambos declaram `visibility`.

`ScriptTestCase` avalia comportamento observável: o que o programa imprimiu e em
que estado suas variáveis terminaram. Nunca o texto do código — duas soluções
diferentes que produzem o mesmo resultado são igualmente corretas.

`initialVariables` é a **entrada** de um caso de script, no mesmo papel que
`args` tem em um caso de função: um mapa de nome para valor declarado
(`{ temperatura: 8 }`), reutilizando `TestArgument` — int, float, str, bool,
None, lista e o marcador de ndarray. O test runner cria o namespace já com esses
nomes ligados aos valores e só então executa o código do aluno.

Nada é concatenado antes do código. Prefixar `temperatura = 8` ao texto do aluno
deslocaria em uma linha todo `SyntaxError` e todo traceback, e a linha apontada
na interface deixaria de ser a linha que ele vê no editor. Injetar no namespace
mantém o texto compilado idêntico ao texto digitado.

Sem `initialVariables`, todo caso avaliaria o script com os mesmos valores
escritos no editor, e responder `classificacao = "agradável"` passaria em um
exercício de temperatura. Isso é o que impede usar "todos os testes passaram"
como critério de conclusão, então exercícios de script cuja entrada é um dado
declaram casos com valores diferentes. Exercícios de `print` puro, em que o
próprio aluno cria os valores, continuam sem entrada.

`FunctionTestCase` declara os argumentos de forma estruturada. Eles atravessam o
Worker como dados e viram valores Python na chamada; o código do aluno nunca é
concatenado com o do harness.

`NdarrayArgument` (`{ kind: 'ndarray', items }`) marca o argumento que precisa
chegar como `np.array(...)`. O valor esperado continua sendo declarado como
lista: o comparador aceita um ndarray onde uma lista é esperada, porque o
conteúdo declara os valores e não a estrutura que os carrega.

### Exemplos derivados

`Exercise` não tem mais um campo `examples` separado. Os exemplos exibidos são a
leitura dos casos públicos (`getPublicExamples`), o que elimina a possibilidade
de o enunciado prometer uma coisa e o teste cobrar outra.

### TestResult

Representa o resultado de um teste.

Pode conter:

- status;

- valor recebido;

- valor esperado;

- erro;

- mensagem.

### ExerciseResult

Representa o resultado completo da submissão.

Pode conter:

- total de testes;

- testes aprovados;

- testes reprovados;

- resultados individuais;

- erro de execução;

- status final.

### Progress

Representa o progresso local do usuário.

Pode conter:

- exercícios iniciados;

- exercícios concluídos;

- tentativas;

- acertos;

- progresso por trilha;

- progresso por tópico.

Esses modelos poderão evoluir conforme a implementação real mostrar necessidade.

---

## 6. Interface

Componentes vivem em:

    src/components/

Subdomínios:

    common/

    editor/

    exercise/

    lesson/

    progress/

Páginas vivem em:

    src/pages/

Layouts compartilhados vivem em:

    src/layouts/

A camada visual deve consumir estados e resultados estruturados.

Ela não deve executar diretamente lógica do Pyodide ou dos testes.

---

## 7. Python Runner

Local:

    src/engine/pythonRunner/

Responsabilidade:

- carregar Pyodide;

- manter uma instância reutilizável;

- executar código;

- capturar stdout;

- capturar exceptions;

- executar funções do aluno;

- transmitir entradas;

- recuperar resultados.

A aplicação deve evitar recarregar o runtime Python em cada execução.

O carregamento do Pyodide deverá ser assíncrono e seu estado deverá ser apresentado corretamente na interface.

Possíveis estados:

    idle

    loading

    ready

    running

    error

A implementação deve evitar bloquear a interface sempre que razoavelmente possível.

Código com loop infinito é um risco em execução no navegador. Se a primeira implementação não possuir mecanismo robusto de timeout ou Worker, essa limitação deve permanecer isolada no runner e ser documentada.

### Implementação atual

O runner é o único caminho da aplicação para executar Python. Arquivos:

    src/engine/pythonRunner/pythonRunner.ts         fachada usada pela aplicação
    src/engine/pythonRunner/pythonRunner.worker.ts  Pyodide dentro do Web Worker
    src/engine/pythonRunner/pythonError.ts          normalização de erros (pura)
    src/engine/pythonRunner/executionOutput.ts      normalização de stdout (pura)
    src/engine/pythonRunner/pyodideConfig.ts        versão e origem do Pyodide
    src/engine/pythonRunner/workerProtocol.ts       contrato de mensagens

Decisões:

**Web Worker.** O Pyodide roda fora da thread principal. A interface continua
respondendo durante o download de ~10 MB, e um laço infinito pode ser
interrompido com `worker.terminate()` em vez de travar a aba.

**Carregamento sob demanda.** O runtime só é baixado na primeira execução —
abrir um exercício não baixa nada. O Worker guarda a instância e a reaproveita
nas execuções seguintes; uma carga que falhe descarta a promise, para que a
próxima tentativa possa recomeçar em vez de repetir o erro guardado.

**Origem do runtime.** O Pyodide vem da CDN oficial, na versão fixada em
`pyodideConfig.ts`. O pacote `pyodide` está instalado apenas como
devDependency, para fornecer os tipos; nada dele entra no bundle.

**stdout.** Capturado com `setStdout({ batched })` e um flush explícito ao
final, porque o callback só entrega o buffer ao encontrar uma quebra de linha.
Os pedaços são unidos em `executionOutput.ts`, fora da interface.

**Erros.** O Worker converte a exceção do Pyodide em `ExecutionError` antes de
responder, porque instâncias de `Error` com campos próprios não sobrevivem à
clonagem estruturada. `pythonError.ts` remove os quadros internos do Pyodide do
traceback e extrai tipo, mensagem e a linha do código do aluno. Erros do
Python, tempo limite e falhas de ambiente são distinguidos pelo campo `kind`.

**Tempo limite.** 10 segundos, contados apenas a partir do momento em que o
Python começa a rodar — o download do runtime e dos pacotes tem um limite
separado e generoso, para não penalizar conexões lentas. Ao estourar, o Worker
é derrubado e o runtime é recarregado na execução seguinte.

**Concorrência.** A fachada mantém no máximo uma execução em andamento; uma
segunda chamada durante a primeira devolve um resultado de erro em vez de
disputar o interpretador.

Estados expostos à interface hoje: `idle`, `preparing` (baixando runtime ou
pacotes) e `running`. `ready` e `error` ainda não existem como estados
persistentes porque nada na interface depende deles fora de uma execução.

---

## 8. Dependências Python

NumPy e Pandas não precisam ser carregados em todos os exercícios.

Quando possível, carregar bibliotecas adicionais apenas quando o exercício precisar delas.

Um exercício poderá futuramente declarar dependências Python.

Exemplo conceitual:

    packages: \["numpy"]

ou:

    packages: \["pandas"]

A implementação concreta poderá escolher outra representação.

### Implementação atual

`Exercise.packages` é a representação escolhida. O runner recebe essa lista e,
antes de executar, carrega apenas os pacotes que ainda não estão disponíveis na
instância — um `Set` no Worker registra o que já foi carregado, então rodar o
mesmo exercício de novo não repete o download.

Exercícios de Python puro declaram `packages: []` e não carregam NumPy. Um
exercício que declare `packages: ["pandas"]` funciona sem nenhuma alteração de
código: qualquer pacote da distribuição do Pyodide é aceito.

---

## 9. Test Runner

Local:

    src/engine/testRunner/

Responsabilidade:

- receber código executado;

- executar diferentes casos de teste;

- comparar resultado esperado e recebido;

- produzir resultados estruturados.

Não deve possuir responsabilidade visual.

O sistema deverá suportar múltiplos testes por exercício.

### Implementação atual

    src/engine/testRunner/testRunner.ts     monta a especificação e julga
    src/engine/testRunner/comparison.ts     comparadores (puros)
    src/engine/testRunner/pythonValue.ts    notação de valores (puro)
    src/engine/testRunner/publicExamples.ts exemplos derivados dos casos públicos
    src/engine/pythonRunner/verificationHarness.ts  o harness Python

**Divisão de trabalho.** O Worker apenas executa e codifica valores; todo o
julgamento acontece em TypeScript. Isso permite testar comparação, visibilidade
e classificação de falha sem carregar o Pyodide — nenhum mock artificial de
runtime é necessário.

**Namespace limpo.** Cada caso executa o código do aluno em um dicionário de
globais recém-criado. Nada sobrevive de uma execução livre anterior, de outra
tentativa ou do caso anterior. O runtime continua carregado: o que é descartado
é o namespace, não o interpretador.

**Falha global antes dos casos.** O código é compilado uma vez; se não compila,
nenhum caso roda. Depois é executado uma vez em modo sonda: um erro já no nível
do módulo é uma falha de execução, e não N casos reprovados. Em modo função, a
ausência do `entryPoint` também é situação própria.

**Script.** Uma execução por caso: o namespace é criado, recebe as
`initialVariables` do caso e então executa o código do aluno; `stdout` é
capturado e as variáveis pedidas são lidas do namespace ao final. Cada caso
recebe uma cópia profunda dos valores declarados, então um script que faça
`valores.append(...)` não altera o que o caso seguinte recebe. Um caso interno
acrescenta duas dimensões: outra entrada e outra forma de observação — verificar
o estado final pega uma saída escrita à mão que o teste de `stdout` sozinho
aprovaria.

A sonda também roda com a entrada do primeiro caso. Sem isso, um script que
dependa de uma variável injetada levantaria `NameError` antes de qualquer caso
ser avaliado.

**Execução livre.** O botão Executar não roda os casos, mas usa a entrada do
primeiro deles — montada pelo mesmo harness e passada como `globals` ao Pyodide.
Sem isso, explorar um exercício de entrada injetada levantaria `NameError` na
primeira linha. Também aqui o código enviado é executado como foi escrito.

**Função.** O runner localiza o `entryPoint` no namespace e o chama com os
argumentos declarados. O aluno não escreve chamadas de teste; a linha de
inspeção `print(funcao(...))` que ele usa enquanto resolve é ignorada, porque em
modo função só o retorno é comparado.

**Comparadores.** Números são comparados pelo valor, como o Python faz (2 == 2.0);
`tolerance` cobre ponto flutuante, e há uma margem padrão pequena para que
0.1 + 0.2 não reprove uma solução correta. Booleano não casa com número, mesmo
que o Python os considere iguais — confundir os dois é justamente o erro que
interessa apontar. `stdout` ignora quebras de linha finais e é sensível a
espaços e acentos. Um tipo que o Magnolia ainda não sabe comparar é reportado
como tal, em vez de reprovar silenciosamente.

---

## 10. Testes públicos e internos

Existem conceitualmente dois tipos de teste:

### Públicos

Podem revelar entrada e saída ao usuário.

### Internos

São utilizados para verificar edge cases sem revelar todos os detalhes da avaliação.

Como a V1 é totalmente frontend, testes enviados ao navegador não são realmente secretos do ponto de vista de segurança.

Portanto, "teste interno" significa:

**não mostrado pela interface normal do Magnolia**

e não:

**inacessível tecnicamente ao usuário**

Caso no futuro seja necessário proteger realmente os testes, a avaliação deverá migrar para backend.

### Implementação atual

`visibility: 'public' | 'internal'` em cada caso.

Um caso público entra nos exemplos do enunciado e, quando falha, mostra entrada,
esperado e recebido. Um caso interno nunca é exibido: ele aparece apenas na
contagem ("1 teste interno ainda falhou") e na orientação genérica sobre casos
de limite.

---

## 11. Evaluator

Local:

    src/engine/evaluator/

O evaluator precisará de estratégias distintas por `executionMode`:

    script    saída do programa e estado final simples
    function  chamar o entryPoint, passar argumentos e comparar o retorno

O modelo de conteúdo já distingue os dois casos, então essa separação é uma
decisão de implementação da Fase 3 e não exige mudança no domínio.

Responsabilidade:

- interpretar resultados do test runner;

- organizar feedback;

- diferenciar erro de execução de resposta incorreta;

- informar progresso da tentativa.

Não deve entregar imediatamente a solução correta.

O evaluator deverá produzir dados que a interface possa apresentar de diferentes formas.

### Implementação atual

`evaluate(TestRunResult, Exercise) -> Evaluation`, em `src/engine/evaluator/`.
Não executa Python e não renderiza nada.

Produz `status` (`all-passed`, `some-failed`, `execution-error`,
`missing-entry-point`), a frase principal, um resumo, os casos **públicos** que
falharam com esperado e recebido, a **contagem** de casos internos que falharam
e uma orientação derivada do tipo de divergência observada.

A orientação diz onde olhar, nunca o que escrever: `stdout` divergente pede
conferir espaços e pontuação; variável divergente aponta o cálculo em vez da
exibição; falha só nos internos pede revisar casos de limite. Nenhuma delas
revela conteúdo de caso interno nem sugere a solução.

---

## 12. Progresso

Local:

    src/progress/

Persistência inicial:

    localStorage

A implementação de armazenamento deve ser encapsulada.

Componentes React não devem acessar diretamente diferentes chaves de localStorage espalhadas pelo projeto.

Uma camada de persistência deverá centralizar leitura e escrita.

Sugestão de chave versionada:

    magnolia.progress.v1

Versionar o formato facilita futuras migrações.

---

## 13. Fluxo de uma tentativa

Fluxo conceitual:

    usuário abre exercício

            ↓

    starterCode é carregado

            ↓

    usuário altera código

            ↓

    usuário executa

            ↓

    pythonRunner executa Python

            ↓

    testRunner executa casos

            ↓

    evaluator interpreta resultados

            ↓

    interface apresenta feedback

            ↓

    progress registra tentativa

            ↓

    exercício pode ser marcado como concluído

---

## 14. Estado

Na V1, preferir estado local, hooks e Context quando necessário.

Não introduzir biblioteca global de estado sem necessidade concreta.

A aplicação pode ser reavaliada caso sua complexidade cresça significativamente.

---

## 15. Navegação

O Magnolia terá múltiplas experiências:

- dashboard;

- trilhas;

- aulas;

- exercícios;

- progresso.

A implementação poderá utilizar uma solução de roteamento apropriada quando necessário.

A navegação deve permitir URLs identificáveis para conteúdos importantes, especialmente exercícios.

---

## 16. Testes automatizados

Vitest será utilizado.

Prioridade de cobertura:

1\. testRunner;

2\. evaluator;

3\. progress;

4\. transformação ou validação de conteúdo;

5\. utilitários importantes.

Testes de interface deverão focar comportamentos relevantes, não detalhes de implementação.

---

## 17. Tratamento de erros

A aplicação deverá diferenciar:

- erro ao carregar Pyodide;

- erro de sintaxe Python;

- erro de runtime;

- resultado incorreto;

- estrutura de exercício inválida;

- erro de persistência.

Falhas do código do aluno não podem derrubar a aplicação React.

---

## 18. Performance

Cuidados principais:

- não inicializar Pyodide repetidamente;

- carregar dependências Python somente quando necessário;

- evitar renders desnecessários;

- evitar carregar todo o conteúdo pesado sem necessidade;

- manter editor e runtime independentes.

Otimizações só devem ser introduzidas quando houver benefício observável.

---

## 19. Extensibilidade

O núcleo não deve assumir que todo exercício futuro será Python.

No futuro poderão existir engines diferentes, como:

    PythonExercise

    SQLExercise

    StatisticsExercise

A V1, entretanto, deve implementar apenas o necessário para Python.

Não construir infraestrutura genérica excessiva antes dessa necessidade existir.

O primeiro eixo de variação real já apareceu, e é interno ao Python: um
exercício de script e um exercício de função são avaliados de formas
diferentes. A união discriminada de `Exercise` cobre esse caso sem antecipar
engines de outras linguagens.

---

## 20. Limites da V1

A V1 não possui:

- backend;

- login;

- banco de dados;

- sincronização entre dispositivos;

- proteção real de testes internos;

- execução Python em servidor;

- tutor com IA.

Esses itens poderão ser avaliados posteriormente.

---

## 21. Critério arquitetural principal

Adicionar uma nova aula ou exercício não deve exigir modificar várias camadas da aplicação.

Idealmente:

    conteúdo novo

        ↓

    aparece automaticamente na plataforma

        ↓

    usa componentes e engines existentes

Esse é um dos principais critérios para avaliar a qualidade da arquitetura.

