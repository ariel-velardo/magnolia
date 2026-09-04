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
    'Use a lista cidades que já está criada.',
    'Exiba três linhas, nesta ordem: o primeiro item, o último item e a quantidade de itens.',
    'Para o último item, use um índice negativo em vez de contar as posições.',
  ],
  starterCode:
    'cidades = ["Recife", "Curitiba", "Belém", "Salvador"]\n\n# Exiba primeiro, último e total\n',
  examples: [
    {
      output: 'Recife\nSalvador\n4',
      explanation:
        'O primeiro item está na posição 0 e o último na posição -1; len conta os itens.',
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
