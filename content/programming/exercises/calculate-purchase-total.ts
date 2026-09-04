import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-functions-002',
  trackId: 'programming',
  topicId: 'programming-functions',
  title: 'Calculando o total de uma compra com uma função',
  description:
    'Empacote o cálculo do total em uma função reutilizável que devolve o valor.',
  order: 2,
  estimatedMinutes: 10,
  difficulty: 'Fácil',
  executionMode: 'function',
  entryPoint: 'calcular_total',
  instructions: [
    'Implemente a função calcular_total, que recebe preco_unitario e quantidade.',
    'Multiplique os dois valores e devolva o resultado com return.',
    'Devolva o número, sem convertê-lo em texto e sem usar print dentro da função.',
    'A linha de inspeção no final serve para você conferir o retorno enquanto resolve.',
  ],
  starterCode:
    'def calcular_total(preco_unitario, quantidade):\n    # Calcule e devolva o total\n    pass\n\n\n# Linha de inspeção: fora da função, só para conferir o retorno\nprint(calcular_total(18.5, 2))\n',
  tests: [
    {
      id: 'prog-functions-002-case-1',
      visibility: 'public',
      args: [18.5, 2],
      expected: 37,
      tolerance: 1e-9,
      explanation: 'Um preço float produz um total float.',
    },
    {
      id: 'prog-functions-002-case-2',
      visibility: 'public',
      args: [7, 3],
      expected: 21,
      explanation: 'Com dois inteiros, o resultado também é inteiro.',
    },
    {
      id: 'prog-functions-002-case-3',
      visibility: 'internal',
      args: [0, 5],
      expected: 0,
    },
    {
      id: 'prog-functions-002-case-4',
      visibility: 'internal',
      args: [99.99, 3],
      expected: 299.97,
      tolerance: 1e-9,
    },
  ],
  hints: [
    {
      id: 'prog-functions-002-hint-1',
      order: 1,
      text: 'A conta é a mesma do exercício de operadores; o que muda é de onde vêm os valores.',
    },
    {
      id: 'prog-functions-002-hint-2',
      order: 2,
      text: 'Use * entre os dois parâmetros, logo depois do return.',
    },
    {
      id: 'prog-functions-002-hint-3',
      order: 3,
      text: 'Não formate o resultado como texto: devolva o número puro.',
    },
  ],
  skill: 'Escrever uma função com parâmetros que devolve um valor calculado.',
  packages: [],
} satisfies Exercise

export default exercise
