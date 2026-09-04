import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-operators-001',
  trackId: 'programming',
  topicId: 'programming-operators',
  title: 'Calculando o total de uma compra',
  description:
    'Multiplique preço por quantidade e exiba o valor total da compra.',
  order: 1,
  estimatedMinutes: 6,
  difficulty: 'Fundamentos',
  executionMode: 'script',
  instructions: [
    'Use as variáveis preco_unitario e quantidade que já estão criadas.',
    'Calcule o total e guarde o resultado em uma variável chamada total.',
    'Exiba a frase no formato: Total: 37.0',
  ],
  starterCode:
    'preco_unitario = 18.5\nquantidade = 2\n\n# Calcule o total e exiba a frase\n',
  examples: [
    {
      output: 'Total: 37.0',
      explanation:
        'O resultado tem casa decimal porque preco_unitario é um float.',
    },
  ],
  hints: [
    {
      id: 'prog-operators-001-hint-1',
      order: 1,
      text: 'Qual operação representa várias unidades com o mesmo preço?',
    },
    {
      id: 'prog-operators-001-hint-2',
      order: 2,
      text: 'Use * entre as duas variáveis e guarde o resultado em total.',
    },
    {
      id: 'prog-operators-001-hint-3',
      order: 3,
      text: 'Monte a frase com uma f-string, mantendo o espaço depois dos dois-pontos.',
    },
  ],
  skill: 'Escrever uma expressão aritmética com variáveis e exibir o resultado.',
  packages: [],
} satisfies Exercise

export default exercise
