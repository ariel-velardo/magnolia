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
    'As variáveis preco_unitario e quantidade já vêm definidas: a verificação roda o mesmo programa com valores diferentes.',
    'Calcule o total e guarde o resultado em uma variável chamada total.',
    'Exiba a frase no formato: Total: 37.0',
  ],
  starterCode: '# Calcule o total e exiba a frase\n',
  tests: [
    {
      id: 'prog-operators-001-case-1',
      visibility: 'public',
      label: 'preco_unitario = 18.5, quantidade = 2',
      initialVariables: { preco_unitario: 18.5, quantidade: 2 },
      expectedStdout: 'Total: 37.0',
      expectedVariables: [{ name: 'total', value: 37, tolerance: 1e-9 }],
      explanation: 'O resultado tem casa decimal porque preco_unitario é um float.',
    },
    {
      id: 'prog-operators-001-case-2',
      visibility: 'public',
      label: 'preco_unitario = 12.5, quantidade = 4',
      initialVariables: { preco_unitario: 12.5, quantidade: 4 },
      expectedStdout: 'Total: 50.0',
      expectedVariables: [{ name: 'total', value: 50, tolerance: 1e-9 }],
    },
    {
      id: 'prog-operators-001-case-3',
      visibility: 'internal',
      label: 'preco_unitario = 7.25, quantidade = 4',
      initialVariables: { preco_unitario: 7.25, quantidade: 4 },
      expectedStdout: 'Total: 29.0',
      expectedVariables: [{ name: 'total', value: 29, tolerance: 1e-9 }],
    },
    {
      id: 'prog-operators-001-case-4',
      visibility: 'internal',
      label: 'preco_unitario = 8.75, quantidade = 0',
      initialVariables: { preco_unitario: 8.75, quantidade: 0 },
      expectedStdout: 'Total: 0.0',
      expectedVariables: [{ name: 'total', value: 0, tolerance: 1e-9 }],
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
