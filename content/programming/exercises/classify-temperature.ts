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
    'A variável temperatura já vem definida: a verificação roda o mesmo programa com valores diferentes.',
    'Guarde a classificação da temperatura em uma variável chamada classificacao.',
    'Abaixo de 18, a classificação é frio.',
    'De 18 a 25, incluindo os dois limites, é agradável.',
    'Acima de 25, é quente.',
    'Ao final, exiba o valor de classificacao.',
  ],
  starterCode: '# Defina a classificacao a partir de temperatura e exiba o resultado\n',
  tests: [
    {
      id: 'prog-conditionals-002-case-1',
      visibility: 'public',
      label: 'temperatura = 8',
      initialVariables: { temperatura: 8 },
      expectedStdout: 'frio',
      expectedVariables: [{ name: 'classificacao', value: 'frio' }],
      explanation: '8 fica abaixo de 18, então cai no primeiro caminho.',
    },
    {
      id: 'prog-conditionals-002-case-2',
      visibility: 'public',
      label: 'temperatura = 21',
      initialVariables: { temperatura: 21 },
      expectedStdout: 'agradável',
      expectedVariables: [{ name: 'classificacao', value: 'agradável' }],
      explanation: '21 está no intervalo de 18 a 25, então cai no caminho do meio.',
    },
    {
      id: 'prog-conditionals-002-case-3',
      visibility: 'internal',
      label: 'temperatura = 32',
      initialVariables: { temperatura: 32 },
      expectedStdout: 'quente',
      expectedVariables: [{ name: 'classificacao', value: 'quente' }],
    },
    {
      id: 'prog-conditionals-002-case-4',
      visibility: 'internal',
      label: 'temperatura = 18',
      initialVariables: { temperatura: 18 },
      expectedStdout: 'agradável',
      expectedVariables: [{ name: 'classificacao', value: 'agradável' }],
    },
    {
      id: 'prog-conditionals-002-case-5',
      visibility: 'internal',
      label: 'temperatura = 25',
      initialVariables: { temperatura: 25 },
      expectedStdout: 'agradável',
      expectedVariables: [{ name: 'classificacao', value: 'agradável' }],
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
