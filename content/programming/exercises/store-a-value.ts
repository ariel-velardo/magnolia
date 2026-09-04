import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-variables-001',
  trackId: 'programming',
  topicId: 'programming-variables',
  title: 'Guardando um valor em um nome',
  description:
    'Crie sua primeira variável e use o nome dela no lugar do valor.',
  order: 1,
  estimatedMinutes: 5,
  difficulty: 'Fundamentos',
  executionMode: 'script',
  instructions: [
    'Crie uma variável chamada cidade guardando o texto Porto Alegre.',
    'Exiba o valor da variável com print.',
    'Passe a variável para o print sem aspas: com aspas, você imprimiria a palavra cidade.',
  ],
  starterCode: '# Crie a variável cidade e imprima o valor dela\n',
  tests: [
    {
      id: 'prog-variables-001-case-1',
      visibility: 'public',
      label: 'Saída do programa',
      expectedStdout: 'Porto Alegre',
    },
    {
      id: 'prog-variables-001-case-2',
      visibility: 'internal',
      label: 'A variável guarda o valor',
      expectedVariables: [{ name: 'cidade', value: 'Porto Alegre' }],
    },
  ],
  hints: [
    {
      id: 'prog-variables-001-hint-1',
      order: 1,
      text: 'Para criar uma variável, escreva o nome, o sinal de igual e o valor.',
    },
    {
      id: 'prog-variables-001-hint-2',
      order: 2,
      text: 'O texto guardado precisa de aspas; o nome da variável dentro do print, não.',
    },
  ],
  skill: 'Criar uma variável de texto e usá-la no lugar do valor literal.',
  packages: [],
} satisfies Exercise

export default exercise
