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
    'As variáveis total_itens e itens_por_caixa já vêm definidas: a verificação roda o mesmo programa com valores diferentes.',
    'Cada caixa comporta a quantidade indicada em itens_por_caixa.',
    'Guarde em caixas_cheias quantas caixas ficam completamente cheias.',
    'Guarde em sobra quantos itens ficam fora das caixas cheias.',
    'Exiba duas linhas: Caixas cheias: 5 e depois Sobram: 3 itens.',
  ],
  starterCode: '# Calcule caixas_cheias e sobra, depois exiba as duas linhas\n',
  tests: [
    {
      id: 'prog-operators-002-case-1',
      visibility: 'public',
      label: 'total_itens = 53, itens_por_caixa = 10',
      initialVariables: { total_itens: 53, itens_por_caixa: 10 },
      expectedStdout: 'Caixas cheias: 5\nSobram: 3 itens',
      expectedVariables: [
        { name: 'caixas_cheias', value: 5 },
        { name: 'sobra', value: 3 },
      ],
      explanation: 'Cinquenta e três itens preenchem cinco caixas de dez e deixam três.',
    },
    {
      id: 'prog-operators-002-case-2',
      visibility: 'public',
      label: 'total_itens = 24, itens_por_caixa = 6',
      initialVariables: { total_itens: 24, itens_por_caixa: 6 },
      expectedStdout: 'Caixas cheias: 4\nSobram: 0 itens',
      expectedVariables: [
        { name: 'caixas_cheias', value: 4 },
        { name: 'sobra', value: 0 },
      ],
      explanation: 'Quando a divisão é exata, não sobra nada — e a linha continua saindo.',
    },
    {
      id: 'prog-operators-002-case-3',
      visibility: 'internal',
      label: 'total_itens = 7, itens_por_caixa = 10',
      initialVariables: { total_itens: 7, itens_por_caixa: 10 },
      expectedStdout: 'Caixas cheias: 0\nSobram: 7 itens',
      expectedVariables: [
        { name: 'caixas_cheias', value: 0 },
        { name: 'sobra', value: 7 },
      ],
    },
    {
      id: 'prog-operators-002-case-4',
      visibility: 'internal',
      label: 'total_itens = 100, itens_por_caixa = 7',
      initialVariables: { total_itens: 100, itens_por_caixa: 7 },
      expectedStdout: 'Caixas cheias: 14\nSobram: 2 itens',
      expectedVariables: [
        { name: 'caixas_cheias', value: 14 },
        { name: 'sobra', value: 2 },
      ],
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
