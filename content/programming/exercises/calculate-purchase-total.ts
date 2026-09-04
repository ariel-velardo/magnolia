import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-variables-002',
  trackId: 'programming',
  topicId: 'programming-variables',
  title: 'Calculando o total de uma compra',
  description:
    'Calcule o valor total a partir do preço unitário e da quantidade comprada.',
  order: 2,
  estimatedMinutes: 7,
  difficulty: 'Fundamentos',
  instructions: [
    'Implemente a função calcular_total.',
    'Multiplique preco_unitario por quantidade.',
    'Retorne o resultado numérico sem convertê-lo em texto.',
  ],
  starterCode:
    'def calcular_total(preco_unitario, quantidade):\n    # Calcule e retorne o total.\n    pass',
  examples: [
    {
      input: 'calcular_total(18.5, 2)',
      output: '37.0',
    },
    {
      input: 'calcular_total(7, 3)',
      output: '21',
    },
  ],
  hints: [
    {
      id: 'prog-variables-002-hint-1',
      order: 1,
      text: 'Pense em qual operação representa várias unidades com o mesmo preço.',
    },
    {
      id: 'prog-variables-002-hint-2',
      order: 2,
      text: 'Use o operador * entre os dois parâmetros.',
    },
  ],
  skill: 'Criar uma expressão aritmética simples com parâmetros.',
  packages: [],
} satisfies Exercise

export default exercise
