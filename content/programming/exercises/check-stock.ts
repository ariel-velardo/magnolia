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
    'As variáveis estoque e estoque_minimo já vêm definidas: a verificação roda o mesmo programa com valores diferentes.',
    'Compare estoque com estoque_minimo.',
    'Quando o estoque estiver abaixo do mínimo, exiba Repor estoque.',
    'Quando não estiver, exiba Estoque suficiente.',
    'Depois da decisão, exiba sempre a linha Verificação concluída.',
  ],
  starterCode: '# Decida qual mensagem exibir\n',
  tests: [
    {
      id: 'prog-conditionals-001-case-1',
      visibility: 'public',
      label: 'estoque = 4, estoque_minimo = 10',
      initialVariables: { estoque: 4, estoque_minimo: 10 },
      expectedStdout: 'Repor estoque\nVerificação concluída',
      explanation: 'A última linha aparece nos dois casos, porque fica fora do bloco.',
    },
    {
      id: 'prog-conditionals-001-case-2',
      visibility: 'public',
      label: 'estoque = 12, estoque_minimo = 10',
      initialVariables: { estoque: 12, estoque_minimo: 10 },
      expectedStdout: 'Estoque suficiente\nVerificação concluída',
      explanation: 'Com estoque acima do mínimo, muda só a primeira linha.',
    },
    {
      id: 'prog-conditionals-001-case-3',
      visibility: 'internal',
      label: 'estoque = 10, estoque_minimo = 10',
      initialVariables: { estoque: 10, estoque_minimo: 10 },
      expectedStdout: 'Estoque suficiente\nVerificação concluída',
    },
    {
      id: 'prog-conditionals-001-case-4',
      visibility: 'internal',
      label: 'estoque = 0, estoque_minimo = 3',
      initialVariables: { estoque: 0, estoque_minimo: 3 },
      expectedStdout: 'Repor estoque\nVerificação concluída',
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
