import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-first-steps-002',
  trackId: 'programming',
  topicId: 'programming-first-steps',
  title: 'Três linhas em ordem',
  description:
    'Escreva um programa com várias instruções e observe que elas são executadas de cima para baixo.',
  order: 2,
  estimatedMinutes: 6,
  difficulty: 'Fundamentos',
  executionMode: 'script',
  instructions: [
    'Escreva três instruções print, uma em cada linha.',
    'A primeira deve exibir Preparando, a segunda Executando e a terceira Pronto.',
    'A ordem das linhas no código é a ordem em que elas aparecem na saída.',
  ],
  starterCode: '# Escreva os três prints, um por linha\n',
  tests: [
    {
      id: 'prog-first-steps-002-case-1',
      visibility: 'public',
      label: 'Saída do programa',
      expectedStdout: 'Preparando\nExecutando\nPronto',
      explanation: 'Três linhas, na mesma ordem em que os prints aparecem no código.',
    },
  ],
  hints: [
    {
      id: 'prog-first-steps-002-hint-1',
      order: 1,
      text: 'Cada mensagem precisa do seu próprio print.',
    },
    {
      id: 'prog-first-steps-002-hint-2',
      order: 2,
      text: 'Se a ordem da saída sair trocada, confira a ordem das linhas no código.',
    },
  ],
  skill: 'Escrever várias instruções e prever a ordem de execução.',
  packages: [],
} satisfies Exercise

export default exercise
