import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-conditionals-001',
  trackId: 'programming',
  topicId: 'programming-conditionals',
  title: 'Classificando a temperatura',
  description:
    'Classifique uma temperatura como fria, agradável ou quente usando intervalos bem definidos.',
  order: 1,
  estimatedMinutes: 10,
  difficulty: 'Fundamentos',
  instructions: [
    'Implemente a função classificar_temperatura.',
    'Retorne frio quando a temperatura for menor que 18.',
    'Retorne agradável quando a temperatura estiver entre 18 e 25, incluindo os limites.',
    'Retorne quente quando a temperatura for maior que 25.',
  ],
  starterCode:
    'def classificar_temperatura(temperatura):\n    # Retorne uma das três classificações.\n    pass',
  examples: [
    {
      input: 'classificar_temperatura(12)',
      output: "'frio'",
    },
    {
      input: 'classificar_temperatura(21)',
      output: "'agradável'",
    },
    {
      input: 'classificar_temperatura(30)',
      output: "'quente'",
    },
  ],
  hints: [
    {
      id: 'prog-conditionals-001-hint-1',
      order: 1,
      text: 'Organize os intervalos em ordem, começando pelo caso abaixo de 18.',
    },
    {
      id: 'prog-conditionals-001-hint-2',
      order: 2,
      text: 'Depois de excluir valores menores que 18, basta verificar se o valor é menor ou igual a 25.',
    },
    {
      id: 'prog-conditionals-001-hint-3',
      order: 3,
      text: 'O último caso pode ser tratado com else, pois os dois intervalos anteriores já foram cobertos.',
    },
  ],
  skill: 'Representar intervalos mutuamente exclusivos com condicionais.',
  packages: [],
} satisfies Exercise

export default exercise
