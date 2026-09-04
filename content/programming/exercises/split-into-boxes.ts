import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-operators-002',
  trackId: 'programming',
  topicId: 'programming-operators',
  title: 'Dividindo itens em caixas',
  description:
    'Use divisão inteira e resto para descobrir quantas caixas cheias saem de um lote e quanto sobra.',
  order: 2,
  estimatedMinutes: 8,
  difficulty: 'Fácil',
  executionMode: 'script',
  instructions: [
    'Cada caixa comporta a quantidade indicada em itens_por_caixa.',
    'Calcule quantas caixas ficam completamente cheias.',
    'Calcule quantos itens sobram fora das caixas cheias.',
    'Exiba duas linhas: Caixas cheias: 5 e depois Sobram: 3 itens.',
  ],
  starterCode:
    'total_itens = 53\nitens_por_caixa = 10\n\n# Calcule as caixas cheias e a sobra\n',
  examples: [
    {
      output: 'Caixas cheias: 5\nSobram: 3 itens',
      explanation:
        'Cinquenta e três itens preenchem cinco caixas de dez e deixam três de fora.',
    },
  ],
  hints: [
    {
      id: 'prog-operators-002-hint-1',
      order: 1,
      text: 'Uma caixa só conta quando fica cheia — a parte decimal da divisão não interessa aqui.',
    },
    {
      id: 'prog-operators-002-hint-2',
      order: 2,
      text: 'A divisão inteira // dá o número de caixas cheias.',
    },
    {
      id: 'prog-operators-002-hint-3',
      order: 3,
      text: 'O que sobra é exatamente o resto da divisão, obtido com %.',
    },
  ],
  skill: 'Aplicar divisão inteira e resto para dividir uma quantidade.',
  packages: [],
} satisfies Exercise

export default exercise
