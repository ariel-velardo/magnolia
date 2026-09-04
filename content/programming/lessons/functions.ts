import type { Lesson } from '../../../src/types'

const lesson = {
  id: 'prog-functions-intro',
  trackId: 'programming',
  topicId: 'programming-functions',
  title: 'Funções: dando nome a um trecho de lógica',
  summary:
    'Empacote um cálculo sob um nome, receba parâmetros e devolva resultados com return.',
  order: 1,
  estimatedMinutes: 18,
  objectives: [
    'Definir uma função com def e chamá-la depois.',
    'Receber valores por parâmetros.',
    'Devolver um resultado com return.',
    'Distinguir devolver um valor de exibi-lo na tela.',
  ],
  concept:
    'Uma função é um trecho de código com nome. Você a define uma vez e a chama quantas vezes quiser, passando valores diferentes a cada chamada.',
  sections: [
    {
      title: 'Por que empacotar lógica',
      paragraphs: [
        'Até aqui, todo programa foi escrito de cima para baixo e executado uma vez só. Isso resolve um caso, mas não se reaproveita: para calcular o mesmo total com outros valores, você teria de copiar as linhas.',
        'Uma função dá nome a essas linhas. Depois de definida, ela pode ser chamada quantas vezes for preciso, e a lógica fica escrita em um lugar só — se precisar corrigir algo, você corrige ali.',
        'A definição começa com def, seguido do nome, de parênteses e de dois-pontos. O corpo fica indentado, como nos blocos que você já conhece.',
      ],
      examples: [
        {
          title: 'Definir e chamar',
          description:
            'A definição não executa nada. O código do corpo só roda quando a função é chamada, na última linha.',
          code:
            'def saudar():\n    print("Olá, Magnolia")\n\nsaudar()',
          output: 'Olá, Magnolia',
        },
      ],
    },
    {
      title: 'Parâmetros: a função recebe dados',
      paragraphs: [
        'Uma função fica realmente útil quando trabalha com valores que variam. Os nomes dentro dos parênteses da definição são os parâmetros: variáveis que existem apenas dentro da função e recebem os valores passados na chamada.',
        'Na chamada, os valores são associados aos parâmetros pela ordem. O primeiro valor vai para o primeiro parâmetro, e assim por diante.',
        'Os parâmetros existem só dentro da função. Fora dela, esses nomes não valem nada — isso é o escopo da função, e é o que permite escrever funções sem se preocupar com o resto do programa.',
      ],
      examples: [
        {
          title: 'Uma função, duas chamadas',
          description:
            'A mesma lógica atende valores diferentes; nome assume um valor a cada chamada.',
          code:
            'def saudar(nome):\n    print(f"Olá, {nome}")\n\nsaudar("Ana")\nsaudar("Caio")',
          output: 'Olá, Ana\nOlá, Caio',
        },
      ],
    },
    {
      title: 'return: devolvendo um resultado',
      paragraphs: [
        'O return encerra a função e entrega um valor a quem a chamou. Esse valor pode ser guardado em uma variável, usado em uma conta ou passado para outra função.',
        'É aqui que mora a diferença mais importante deste tópico. Uma função que usa print mostra algo na tela e devolve None — ou seja, não entrega nada aproveitável. Uma função que usa return entrega um valor, e quem chamou decide o que fazer com ele.',
        'Quando o enunciado pede para retornar um valor, o print dentro da função não resolve: ele desenha na tela, mas a função continua devolvendo None.',
      ],
      examples: [
        {
          title: 'Devolver e depois usar',
          description:
            'A função apenas calcula e devolve. Quem chamou guarda o resultado e decide exibi-lo.',
          code:
            'def calcular_total(preco, quantidade):\n    return preco * quantidade\n\ntotal = calcular_total(18.5, 2)\nprint(total)',
          output: '37.0',
        },
      ],
    },
    {
      title: 'Conferindo o retorno enquanto você aprende',
      paragraphs: [
        'Uma função que só retorna não produz saída nenhuma sozinha. Executar um exercício de função e não ver nada na tela é o comportamento esperado, não um erro.',
        'Para conferir o resultado, chame a função fora dela e imprima o retorno: print(calcular_total(18.5, 2)). Essa linha é apenas uma ferramenta de inspeção — ela fica fora da função, e não faz parte da solução.',
        'Repare na diferença: o print continua proibido dentro da função quando o objetivo é retornar. Fora dela, ele é bem-vindo enquanto você confere seu próprio trabalho.',
      ],
      examples: [
        {
          title: 'Inspeção fora da função',
          description:
            'A função permanece com return puro. A última linha existe só para você ver o resultado enquanto resolve o exercício.',
          code:
            'def dobro(numero):\n    return numero * 2\n\n# Linha de inspeção: fora da função, só para conferir\nprint(dobro(21))',
          output: '42',
        },
      ],
    },
  ],
  commonMistakes: [
    'Usar print dentro da função quando o enunciado pede return: a função passa a devolver None.',
    'Definir a função e nunca chamá-la — a definição sozinha não executa nada.',
    'Esquecer os dois-pontos no final da linha do def.',
    'Tentar usar um parâmetro fora da função, onde ele não existe.',
    'Colocar o return dentro de um laço por engano e encerrar a função na primeira repetição.',
  ],
  relatedExerciseIds: ['prog-functions-001', 'prog-functions-002'],
} satisfies Lesson

export default lesson
