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
  examples: [
    {
      input: 'calcular_total(18.5, 2)',
      output: '37.0',
      explanation: 'Um preço float produz um total float.',
    },
    {
      input: 'calcular_total(7, 3)',
      output: '21',
      explanation: 'Com dois inteiros, o resultado também é inteiro.',
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
