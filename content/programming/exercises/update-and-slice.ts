import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-lists-002',
  trackId: 'programming',
  topicId: 'programming-lists',
  title: 'Corrigindo e recortando uma lista',
  description:
    'Altere um item, acrescente outro ao final e recorte um trecho da lista.',
  order: 2,
  estimatedMinutes: 9,
  difficulty: 'Fácil',
  executionMode: 'script',
  instructions: [
    'A primeira nota foi lançada errada: substitua o item da posição 0 por 9.0.',
    'Acrescente a nota 10.0 ao final da lista.',
    'Exiba a lista completa.',
    'Em seguida, exiba apenas as duas primeiras notas, usando um slice.',
  ],
  starterCode: 'notas = [7.0, 8.5, 6.0]\n\n# Corrija, acrescente e recorte\n',
  examples: [
    {
      output: '[9.0, 8.5, 6.0, 10.0]\n[9.0, 8.5]',
      explanation:
        'O slice para na posição 2, que fica de fora — por isso ele devolve dois itens.',
    },
  ],
  hints: [
    {
      id: 'prog-lists-002-hint-1',
      order: 1,
      text: 'Para trocar um item, atribua um novo valor àquela posição.',
    },
    {
      id: 'prog-lists-002-hint-2',
      order: 2,
      text: 'append acrescenta ao final; ele altera a lista e não devolve uma nova.',
    },
    {
      id: 'prog-lists-002-hint-3',
      order: 3,
      text: 'Para os dois primeiros itens, o slice vai de 0 até 2 — e o 2 não entra.',
    },
  ],
  skill: 'Modificar itens de uma lista e recortar trechos com slicing.',
  packages: [],
} satisfies Exercise

export default exercise
