import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-conditionals-001',
  trackId: 'programming',
  topicId: 'programming-conditionals',
  title: 'Avisando quando o estoque acaba',
  description:
    'Exiba um alerta apenas quando a quantidade em estoque estiver abaixo do mínimo.',
  order: 1,
  estimatedMinutes: 7,
  difficulty: 'Fundamentos',
  executionMode: 'script',
  instructions: [
    'Compare estoque com estoque_minimo.',
    'Quando o estoque estiver abaixo do mínimo, exiba Repor estoque.',
    'Quando não estiver, exiba Estoque suficiente.',
    'Depois da decisão, exiba sempre a linha Verificação concluída.',
  ],
  starterCode: 'estoque = 4\nestoque_minimo = 10\n\n# Decida qual mensagem exibir\n',
  examples: [
    {
      output: 'Repor estoque\nVerificação concluída',
      explanation:
        'A última linha aparece nos dois casos porque fica fora do bloco indentado.',
    },
  ],
  hints: [
    {
      id: 'prog-conditionals-001-hint-1',
      order: 1,
      text: 'Comece pela comparação: estoque menor que estoque_minimo.',
    },
    {
      id: 'prog-conditionals-001-hint-2',
      order: 2,
      text: 'O if termina com dois-pontos, e a linha seguinte fica indentada.',
    },
    {
      id: 'prog-conditionals-001-hint-3',
      order: 3,
      text: 'A mensagem final não pertence a nenhum dos caminhos: deixe-a sem indentação.',
    },
  ],
  skill: 'Executar um bloco condicionalmente e reconhecer o alcance da indentação.',
  packages: [],
} satisfies Exercise

export default exercise
