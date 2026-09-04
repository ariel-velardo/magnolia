import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-loops-002',
  trackId: 'programming',
  topicId: 'programming-loops',
  title: 'Somando apenas valores positivos',
  description:
    'Percorra uma lista e some somente os valores maiores que zero.',
  order: 2,
  estimatedMinutes: 10,
  difficulty: 'Fácil+',
  executionMode: 'script',
  instructions: [
    'Percorra todos os números da lista valores.',
    'Some ao total apenas os números maiores que zero.',
    'Exiba o total depois que o loop terminar.',
    'Quando não houver nenhum positivo, o total exibido deve ser 0.',
  ],
  starterCode:
    'valores = [4, -2, 7, 0]\ntotal = 0\n\n# Some apenas os valores positivos\n\nprint(total)\n',
  examples: [
    {
      output: '11',
      explanation: 'Somente 4 e 7 entram na soma; -2 e 0 são ignorados.',
    },
    {
      output: '0',
      explanation:
        'Se valores fosse [-3, 0, -1], nenhum item entraria e o total continuaria zero.',
    },
  ],
  hints: [
    {
      id: 'prog-loops-002-hint-1',
      order: 1,
      text: 'Use um for para observar um valor de cada vez.',
    },
    {
      id: 'prog-loops-002-hint-2',
      order: 2,
      text: 'Antes de atualizar o total, verifique com um if se o valor atual é maior que zero.',
    },
    {
      id: 'prog-loops-002-hint-3',
      order: 3,
      text: 'O if fica dentro do for, então sua linha de soma leva duas indentações.',
    },
  ],
  skill: 'Combinar loop e condicional para acumular apenas itens selecionados.',
  packages: [],
} satisfies Exercise

export default exercise
