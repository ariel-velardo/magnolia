import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-lists-001',
  trackId: 'programming',
  topicId: 'programming-lists',
  title: 'Somando apenas valores positivos',
  description:
    'Percorra uma lista e some somente os valores maiores que zero.',
  order: 1,
  estimatedMinutes: 12,
  difficulty: 'Fácil',
  instructions: [
    'Implemente a função somar_positivos.',
    'Percorra todos os números recebidos em valores.',
    'Inclua na soma apenas números maiores que zero.',
    'Retorne zero quando não houver valores positivos.',
  ],
  starterCode:
    'def somar_positivos(valores):\n    total = 0\n    # Percorra a lista e atualize o total.\n    return total',
  examples: [
    {
      input: 'somar_positivos([4, -2, 7, 0])',
      output: '11',
      explanation: 'Somente 4 e 7 entram na soma.',
    },
    {
      input: 'somar_positivos([-3, 0, -1])',
      output: '0',
      explanation: 'A lista não possui números maiores que zero.',
    },
  ],
  hints: [
    {
      id: 'prog-lists-001-hint-1',
      order: 1,
      text: 'Use um laço for para observar um valor de cada vez.',
    },
    {
      id: 'prog-lists-001-hint-2',
      order: 2,
      text: 'Antes de atualizar o acumulador, verifique se o valor atual é maior que zero.',
    },
    {
      id: 'prog-lists-001-hint-3',
      order: 3,
      text: 'Mantenha o return fora do laço para terminar de percorrer toda a lista.',
    },
  ],
  skill: 'Percorrer uma lista e acumular itens que atendem a uma condição.',
  packages: [],
} satisfies Exercise

export default exercise
