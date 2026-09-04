import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-operators-003',
  trackId: 'programming',
  topicId: 'programming-operators',
  title: 'Comparando dois valores',
  description:
    'Produza booleanos a partir de comparações e exiba as respostas.',
  order: 3,
  estimatedMinutes: 7,
  difficulty: 'Fundamentos',
  executionMode: 'script',
  instructions: [
    'As variáveis meta_prevista e meta_atingida já vêm definidas: a verificação roda o mesmo programa com valores diferentes.',
    'Compare as duas metas e exiba três linhas, nesta ordem.',
    'Primeira: se meta_atingida é maior ou igual a meta_prevista.',
    'Segunda: se as duas metas são exatamente iguais.',
    'Terceira: se meta_atingida é diferente de zero.',
    'Cada linha deve exibir apenas True ou False.',
  ],
  starterCode: '# Exiba as três comparações\n',
  tests: [
    {
      id: 'prog-operators-003-case-1',
      visibility: 'public',
      label: 'meta_prevista = 100, meta_atingida = 120',
      initialVariables: { meta_prevista: 100, meta_atingida: 120 },
      expectedStdout: 'True\nFalse\nTrue',
      explanation:
        '120 é maior que 100, as metas não são iguais, e 120 é diferente de zero.',
    },
    {
      id: 'prog-operators-003-case-2',
      visibility: 'public',
      label: 'meta_prevista = 100, meta_atingida = 100',
      initialVariables: { meta_prevista: 100, meta_atingida: 100 },
      expectedStdout: 'True\nTrue\nTrue',
      explanation: 'Metas iguais satisfazem o "maior ou igual" e a igualdade.',
    },
    {
      id: 'prog-operators-003-case-3',
      visibility: 'internal',
      label: 'meta_prevista = 50, meta_atingida = 0',
      initialVariables: { meta_prevista: 50, meta_atingida: 0 },
      expectedStdout: 'False\nFalse\nFalse',
    },
    {
      id: 'prog-operators-003-case-4',
      visibility: 'internal',
      label: 'meta_prevista = 80, meta_atingida = 90',
      initialVariables: { meta_prevista: 80, meta_atingida: 90 },
      expectedStdout: 'True\nFalse\nTrue',
    },
  ],
  hints: [
    {
      id: 'prog-operators-003-hint-1',
      order: 1,
      text: 'Uma comparação já produz True ou False — não é preciso escrever nada além dela.',
    },
    {
      id: 'prog-operators-003-hint-2',
      order: 2,
      text: 'Igualdade usa dois sinais: ==. Um sinal só guardaria um valor.',
    },
    {
      id: 'prog-operators-003-hint-3',
      order: 3,
      text: 'Para "diferente de", use !=.',
    },
  ],
  skill: 'Escrever comparações e reconhecer que o resultado é um booleano.',
  packages: [],
} satisfies Exercise

export default exercise
