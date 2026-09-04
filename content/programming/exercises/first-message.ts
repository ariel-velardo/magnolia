import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-first-steps-001',
  trackId: 'programming',
  topicId: 'programming-first-steps',
  title: 'Sua primeira mensagem',
  description:
    'Exiba uma mensagem na tela e veja o computador responder ao que você escreveu.',
  order: 1,
  estimatedMinutes: 5,
  difficulty: 'Fundamentos',
  executionMode: 'script',
  instructions: [
    'Complete a linha do print para exibir a mensagem Olá, Magnolia.',
    'O texto deve ficar entre aspas, dentro dos parênteses.',
    'Execute e confira a saída.',
  ],
  starterCode: 'print(  )\n',
  tests: [
    {
      id: 'prog-first-steps-001-case-1',
      visibility: 'public',
      label: 'Saída do programa',
      expectedStdout: 'Olá, Magnolia',
      explanation: 'A mensagem precisa sair exatamente assim, com acento e vírgula.',
    },
  ],
  hints: [
    {
      id: 'prog-first-steps-001-hint-1',
      order: 1,
      text: 'O que você quer mostrar vai dentro dos parênteses do print.',
    },
    {
      id: 'prog-first-steps-001-hint-2',
      order: 2,
      text: 'Para o Python entender que é um texto, envolva a mensagem em aspas.',
    },
  ],
  skill: 'Exibir um valor literal de texto com print.',
  packages: [],
} satisfies Exercise

export default exercise
