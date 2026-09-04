import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-first-steps-003',
  trackId: 'programming',
  topicId: 'programming-first-steps',
  title: 'Comentando um programa',
  description:
    'Use comentários para explicar o código e confirme que eles não produzem saída.',
  order: 3,
  estimatedMinutes: 6,
  difficulty: 'Fundamentos',
  executionMode: 'script',
  instructions: [
    'Mantenha os dois prints existentes.',
    'Acrescente acima de cada um um comentário curto explicando o que ele faz.',
    'Transforme a linha do print("rascunho") em comentário, para que ela deixe de aparecer na saída.',
  ],
  starterCode:
    'print("Relatório de vendas")\nprint("rascunho")\nprint("Total: 240")\n',
  tests: [
    {
      id: 'prog-first-steps-003-case-1',
      visibility: 'public',
      label: 'Saída do programa',
      expectedStdout: 'Relatório de vendas\nTotal: 240',
      explanation: 'A linha do rascunho não pode aparecer, e os comentários também não.',
    },
  ],
  hints: [
    {
      id: 'prog-first-steps-003-hint-1',
      order: 1,
      text: 'Um comentário começa com # e vale até o fim da linha.',
    },
    {
      id: 'prog-first-steps-003-hint-2',
      order: 2,
      text: 'Para desativar uma instrução sem apagá-la, basta colocar # no começo da linha.',
    },
    {
      id: 'prog-first-steps-003-hint-3',
      order: 3,
      text: 'Se ainda aparecer rascunho na saída, confira se o # ficou antes do print e não depois.',
    },
  ],
  skill: 'Escrever comentários e distinguir o que produz saída do que não produz.',
  packages: [],
} satisfies Exercise

export default exercise
