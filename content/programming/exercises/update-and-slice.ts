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
    'A lista notas já vem definida: a verificação roda o mesmo programa com listas diferentes.',
    'A primeira nota foi lançada errada: substitua o item da posição 0 por 9.0.',
    'Acrescente a nota 10.0 ao final da lista.',
    'Exiba a lista completa.',
    'Em seguida, exiba apenas as duas primeiras notas, usando um slice.',
  ],
  starterCode: '# Corrija, acrescente e recorte\n',
  tests: [
    {
      id: 'prog-lists-002-case-1',
      visibility: 'public',
      label: 'notas = [7.5, 8.5, 6.25]',
      initialVariables: { notas: [7.5, 8.5, 6.25] },
      expectedStdout: '[9.0, 8.5, 6.25, 10.0]\n[9.0, 8.5]',
      expectedVariables: [{ name: 'notas', value: [9, 8.5, 6.25, 10], tolerance: 1e-9 }],
      explanation: 'O slice para na posição 2, que fica de fora — por isso dois itens.',
    },
    {
      id: 'prog-lists-002-case-2',
      visibility: 'public',
      label: 'notas = [5.5, 4.25]',
      initialVariables: { notas: [5.5, 4.25] },
      expectedStdout: '[9.0, 4.25, 10.0]\n[9.0, 4.25]',
      expectedVariables: [{ name: 'notas', value: [9, 4.25, 10], tolerance: 1e-9 }],
      explanation: 'A correção vale para a posição 0, seja qual for o tamanho da lista.',
    },
    {
      id: 'prog-lists-002-case-3',
      visibility: 'internal',
      label: 'notas = [3.75]',
      initialVariables: { notas: [3.75] },
      expectedStdout: '[9.0, 10.0]\n[9.0, 10.0]',
      expectedVariables: [{ name: 'notas', value: [9, 10], tolerance: 1e-9 }],
    },
    {
      id: 'prog-lists-002-case-4',
      visibility: 'internal',
      label: 'notas = [1.5, 2.25, 3.5, 4.75]',
      initialVariables: { notas: [1.5, 2.25, 3.5, 4.75] },
      expectedStdout: '[9.0, 2.25, 3.5, 4.75, 10.0]\n[9.0, 2.25]',
      expectedVariables: [
        { name: 'notas', value: [9, 2.25, 3.5, 4.75, 10], tolerance: 1e-9 },
      ],
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
