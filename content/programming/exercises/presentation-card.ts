import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-first-steps-004',
  trackId: 'programming',
  topicId: 'programming-first-steps',
  title: 'Um cartão de apresentação',
  description:
    'Combine texto e números em um pequeno programa que imprime um cartão com três linhas.',
  order: 4,
  estimatedMinutes: 8,
  difficulty: 'Fácil',
  executionMode: 'script',
  instructions: [
    'Escreva um programa que exiba exatamente três linhas.',
    'A primeira linha deve ser Ana Ribeiro.',
    'A segunda deve ser Analista de dados.',
    'A terceira deve ser Anos de experiência: 6 — use print com dois valores separados por vírgula, sendo o número sem aspas.',
  ],
  starterCode: '# Monte o cartão em três linhas de saída\n',
  tests: [
    {
      id: 'prog-first-steps-004-case-1',
      visibility: 'public',
      label: 'Saída do programa',
      expectedStdout: 'Ana Ribeiro\nAnalista de dados\nAnos de experiência: 6',
      explanation:
        'Na terceira linha há um único espaço antes do 6, colocado pelo próprio print.',
    },
  ],
  hints: [
    {
      id: 'prog-first-steps-004-hint-1',
      order: 1,
      text: 'Comece resolvendo as duas primeiras linhas, que são só texto.',
    },
    {
      id: 'prog-first-steps-004-hint-2',
      order: 2,
      text: 'Na terceira linha, o print aceita dois valores separados por vírgula: um texto e um número.',
    },
    {
      id: 'prog-first-steps-004-hint-3',
      order: 3,
      text: 'O texto termina em dois-pontos e o print já acrescenta o espaço antes do número — não coloque um espaço extra no fim do texto.',
    },
  ],
  skill: 'Compor uma saída de várias linhas misturando texto e número.',
  packages: [],
} satisfies Exercise

export default exercise
