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
    'A lista valores já vem definida: a verificação roda o mesmo programa com listas diferentes.',
    'Percorra todos os números da lista valores.',
    'Some ao total apenas os números maiores que zero.',
    'Exiba o total depois que o loop terminar.',
    'Quando não houver nenhum positivo, o total exibido deve ser 0.',
  ],
  starterCode: 'total = 0\n\n# Some apenas os valores positivos\n\nprint(total)\n',
  tests: [
    {
      id: 'prog-loops-002-case-1',
      visibility: 'public',
      label: 'valores = [4, -2, 7, 0]',
      initialVariables: { valores: [4, -2, 7, 0] },
      expectedStdout: '11',
      expectedVariables: [{ name: 'total', value: 11 }],
      explanation: 'Somente 4 e 7 entram na soma; -2 e 0 são ignorados.',
    },
    {
      id: 'prog-loops-002-case-2',
      visibility: 'public',
      label: 'valores = [-5, -1]',
      initialVariables: { valores: [-5, -1] },
      expectedStdout: '0',
      expectedVariables: [{ name: 'total', value: 0 }],
      explanation: 'Sem nenhum positivo, o total continua sendo o valor inicial.',
    },
    {
      id: 'prog-loops-002-case-3',
      visibility: 'internal',
      label: 'valores = []',
      initialVariables: { valores: [] },
      expectedStdout: '0',
      expectedVariables: [{ name: 'total', value: 0 }],
    },
    {
      id: 'prog-loops-002-case-4',
      visibility: 'internal',
      label: 'valores = [1, 2, 3]',
      initialVariables: { valores: [1, 2, 3] },
      expectedStdout: '6',
      expectedVariables: [{ name: 'total', value: 6 }],
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
