import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-conditionals-002',
  trackId: 'programming',
  topicId: 'programming-conditionals',
  title: 'Classificando a temperatura',
  description:
    'Classifique uma temperatura em três faixas usando if, elif e else.',
  order: 2,
  estimatedMinutes: 10,
  difficulty: 'Fácil',
  executionMode: 'script',
  instructions: [
    'Guarde a classificação da temperatura em uma variável chamada classificacao.',
    'Abaixo de 18, a classificação é frio.',
    'De 18 a 25, incluindo os dois limites, é agradável.',
    'Acima de 25, é quente.',
    'Ao final, exiba o valor de classificacao.',
  ],
  starterCode: 'temperatura = 21\n\n# Defina a classificacao e exiba o resultado\n',
  examples: [
    {
      output: 'agradável',
      explanation: '21 está no intervalo de 18 a 25, então cai no caminho do meio.',
    },
    {
      output: 'frio',
      explanation:
        'Se temperatura fosse 12, o primeiro teste seria verdadeiro e os demais nem seriam avaliados.',
    },
  ],
  hints: [
    {
      id: 'prog-conditionals-002-hint-1',
      order: 1,
      text: 'Organize os intervalos em ordem, começando pelo caso abaixo de 18.',
    },
    {
      id: 'prog-conditionals-002-hint-2',
      order: 2,
      text: 'Depois de excluir os valores menores que 18, basta verificar se o valor é menor ou igual a 25.',
    },
    {
      id: 'prog-conditionals-002-hint-3',
      order: 3,
      text: 'O último caso pode ser um else, já que os dois intervalos anteriores cobriram o resto.',
    },
  ],
  skill: 'Representar intervalos mutuamente exclusivos com if, elif e else.',
  packages: [],
} satisfies Exercise

export default exercise
