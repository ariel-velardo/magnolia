import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-functions-001',
  trackId: 'programming',
  topicId: 'programming-functions',
  title: 'Apresentando um perfil com uma função',
  description:
    'Transforme em função a apresentação que você já montou como script, agora devolvendo o texto em vez de exibi-lo.',
  order: 1,
  estimatedMinutes: 10,
  difficulty: 'Fácil',
  executionMode: 'function',
  entryPoint: 'apresentar_perfil',
  instructions: [
    'Implemente a função apresentar_perfil, que recebe nome e idade.',
    'Monte a frase no formato: Ana tem 28 anos.',
    'Devolva a frase com return. Dentro da função, não use print: o objetivo é entregar o texto a quem chamou.',
    'Para conferir o resultado enquanto resolve, chame a função fora dela e imprima o retorno — essa linha de inspeção não faz parte da solução.',
  ],
  starterCode:
    'def apresentar_perfil(nome, idade):\n    # Monte a frase e devolva com return\n    pass\n\n\n# Linha de inspeção: fora da função, só para conferir o retorno\nprint(apresentar_perfil("Ana", 28))\n',
  examples: [
    {
      input: 'apresentar_perfil("Ana", 28)',
      output: "'Ana tem 28 anos.'",
      explanation:
        'A função devolve o texto. A linha de inspeção é que o exibe na tela.',
    },
    {
      input: 'apresentar_perfil("Caio", 19)',
      output: "'Caio tem 19 anos.'",
    },
  ],
  hints: [
    {
      id: 'prog-functions-001-hint-1',
      order: 1,
      text: 'A f-string que você usou no exercício de variáveis serve aqui, agora com os parâmetros.',
    },
    {
      id: 'prog-functions-001-hint-2',
      order: 2,
      text: 'Troque o pass por um return seguido da frase montada.',
    },
    {
      id: 'prog-functions-001-hint-3',
      order: 3,
      text: 'Se a inspeção exibir None, é sinal de que a função imprimiu em vez de retornar.',
    },
  ],
  skill: 'Devolver um valor de uma função em vez de exibi-lo.',
  packages: [],
} satisfies Exercise

export default exercise
