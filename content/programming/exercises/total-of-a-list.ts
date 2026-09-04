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
    'A variável total já começa em zero, fora do loop.',
    'Percorra a lista duracoes com um for e some cada valor ao total.',
    'Depois que o loop terminar, exiba o total uma única vez.',
  ],
  starterCode:
    'duracoes = [20, 35, 15]\ntotal = 0\n\n# Percorra a lista e atualize o total\n\nprint(total)\n',
  examples: [
    {
      output: '70',
      explanation:
        'Uma única linha de saída: o print está fora do loop e roda depois de todas as repetições.',
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
