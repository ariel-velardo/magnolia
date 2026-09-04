import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-loops-001',
  trackId: 'programming',
  topicId: 'programming-loops',
  title: 'Somando os tempos de estudo',
  description:
    'Percorra uma lista com for e acumule o total em uma variável.',
  order: 1,
  estimatedMinutes: 8,
  difficulty: 'Fácil',
  executionMode: 'script',
  instructions: [
    'A lista duracoes já vem definida: a verificação roda o mesmo programa com listas diferentes.',
    'A variável total já começa em zero, fora do loop.',
    'Percorra a lista duracoes com um for e some cada valor ao total.',
    'Depois que o loop terminar, exiba o total uma única vez.',
  ],
  starterCode: 'total = 0\n\n# Percorra a lista e atualize o total\n\nprint(total)\n',
  tests: [
    {
      id: 'prog-loops-001-case-1',
      visibility: 'public',
      label: 'duracoes = [20, 35, 15]',
      initialVariables: { duracoes: [20, 35, 15] },
      expectedStdout: '70',
      expectedVariables: [{ name: 'total', value: 70 }],
      explanation: 'Uma única linha: o print fica fora do laço.',
    },
    {
      id: 'prog-loops-001-case-2',
      visibility: 'public',
      label: 'duracoes = [50, 10]',
      initialVariables: { duracoes: [50, 10] },
      expectedStdout: '60',
      expectedVariables: [{ name: 'total', value: 60 }],
      explanation: 'O mesmo laço precisa somar uma lista de outro tamanho.',
    },
    {
      id: 'prog-loops-001-case-3',
      visibility: 'internal',
      label: 'duracoes = []',
      initialVariables: { duracoes: [] },
      expectedStdout: '0',
      expectedVariables: [{ name: 'total', value: 0 }],
    },
    {
      id: 'prog-loops-001-case-4',
      visibility: 'internal',
      label: 'duracoes = [5, 5, 5, 5, 5, 5]',
      initialVariables: { duracoes: [5, 5, 5, 5, 5, 5] },
      expectedStdout: '30',
      expectedVariables: [{ name: 'total', value: 30 }],
    },
  ],
  hints: [
    {
      id: 'prog-loops-001-hint-1',
      order: 1,
      text: 'O for precisa de um nome para o item atual e da lista de onde ele vem.',
    },
    {
      id: 'prog-loops-001-hint-2',
      order: 2,
      text: 'Dentro do loop, atualize o total somando o item atual ao valor anterior.',
    },
    {
      id: 'prog-loops-001-hint-3',
      order: 3,
      text: 'Se aparecerem três linhas na saída, o print acabou ficando dentro do loop.',
    },
  ],
  skill: 'Percorrer uma lista acumulando um resultado em uma variável.',
  packages: [],
} satisfies Exercise

export default exercise
