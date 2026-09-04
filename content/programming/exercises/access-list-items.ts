import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-lists-001',
  trackId: 'programming',
  topicId: 'programming-lists',
  title: 'Primeiro, último e quantos',
  description:
    'Acesse itens de uma lista por posição e descubra quantos elementos ela tem.',
  order: 1,
  estimatedMinutes: 7,
  difficulty: 'Fundamentos',
  executionMode: 'script',
  instructions: [
    'A lista cidades já vem definida: a verificação roda o mesmo programa com listas diferentes.',
    'Exiba três linhas, nesta ordem: o primeiro item, o último item e a quantidade de itens.',
    'Para o último item, use um índice negativo em vez de contar as posições.',
  ],
  starterCode: '# Exiba primeiro, último e total\n',
  tests: [
    {
      id: 'prog-lists-001-case-1',
      visibility: 'public',
      label: "cidades = ['Recife', 'Curitiba', 'Belém', 'Salvador']",
      initialVariables: { cidades: ['Recife', 'Curitiba', 'Belém', 'Salvador'] },
      expectedStdout: 'Recife\nSalvador\n4',
      expectedVariables: [
        { name: 'cidades', value: ['Recife', 'Curitiba', 'Belém', 'Salvador'] },
      ],
      explanation: 'Primeiro item, último item e quantidade, nesta ordem.',
    },
    {
      id: 'prog-lists-001-case-2',
      visibility: 'public',
      label: "cidades = ['Natal', 'Manaus']",
      initialVariables: { cidades: ['Natal', 'Manaus'] },
      expectedStdout: 'Natal\nManaus\n2',
      expectedVariables: [{ name: 'cidades', value: ['Natal', 'Manaus'] }],
      explanation: 'Com outra lista, o índice negativo continua achando o último item.',
    },
    {
      id: 'prog-lists-001-case-3',
      visibility: 'internal',
      label: "cidades = ['Cuiabá']",
      initialVariables: { cidades: ['Cuiabá'] },
      expectedStdout: 'Cuiabá\nCuiabá\n1',
      expectedVariables: [{ name: 'cidades', value: ['Cuiabá'] }],
    },
    {
      id: 'prog-lists-001-case-4',
      visibility: 'internal',
      label: "cidades = ['Belo Horizonte', 'Santos', 'Olinda']",
      initialVariables: { cidades: ['Belo Horizonte', 'Santos', 'Olinda'] },
      expectedStdout: 'Belo Horizonte\nOlinda\n3',
      expectedVariables: [
        { name: 'cidades', value: ['Belo Horizonte', 'Santos', 'Olinda'] },
      ],
    },
  ],
  hints: [
    {
      id: 'prog-lists-001-hint-1',
      order: 1,
      text: 'As posições começam em zero, então o primeiro item é cidades[0].',
    },
    {
      id: 'prog-lists-001-hint-2',
      order: 2,
      text: 'O índice -1 pega o último item sem precisar saber o tamanho da lista.',
    },
    {
      id: 'prog-lists-001-hint-3',
      order: 3,
      text: 'A quantidade de itens vem de len(cidades).',
    },
  ],
  skill: 'Acessar itens de uma lista por índice positivo e negativo.',
  packages: [],
} satisfies Exercise

export default exercise
