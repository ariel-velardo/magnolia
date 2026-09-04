import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-operators-004',
  trackId: 'programming',
  topicId: 'programming-operators',
  title: 'Combinando critérios de aprovação',
  description:
    'Junte duas comparações em um único critério usando operadores lógicos.',
  order: 4,
  estimatedMinutes: 9,
  difficulty: 'Fácil+',
  executionMode: 'script',
  instructions: [
    'As variáveis nota e presenca já vêm definidas: a verificação roda o mesmo programa com valores diferentes.',
    'O aluno é aprovado quando tem nota maior ou igual a 7 E presença maior ou igual a 75.',
    'Guarde esse resultado em uma variável chamada aprovado.',
    'Exiba duas linhas: primeiro o valor de aprovado, depois o valor de aprovado invertido com not.',
    'Não use if nesta prática: apenas combine as comparações em uma expressão.',
  ],
  starterCode: '# Combine os dois critérios\n',
  tests: [
    {
      id: 'prog-operators-004-case-1',
      visibility: 'public',
      label: 'nota = 8.5, presenca = 62',
      initialVariables: { nota: 8.5, presenca: 62 },
      expectedStdout: 'False\nTrue',
      expectedVariables: [{ name: 'aprovado', value: false }],
      explanation: 'A nota atende ao critério, a presença não — e and exige as duas.',
    },
    {
      id: 'prog-operators-004-case-2',
      visibility: 'public',
      label: 'nota = 8.5, presenca = 90',
      initialVariables: { nota: 8.5, presenca: 90 },
      expectedStdout: 'True\nFalse',
      expectedVariables: [{ name: 'aprovado', value: true }],
      explanation: 'Com os dois critérios atendidos, aprovado vira True.',
    },
    {
      id: 'prog-operators-004-case-3',
      visibility: 'internal',
      label: 'nota = 6.5, presenca = 100',
      initialVariables: { nota: 6.5, presenca: 100 },
      expectedStdout: 'False\nTrue',
      expectedVariables: [{ name: 'aprovado', value: false }],
    },
    {
      id: 'prog-operators-004-case-4',
      visibility: 'internal',
      label: 'nota = 7, presenca = 75',
      initialVariables: { nota: 7, presenca: 75 },
      expectedStdout: 'True\nFalse',
      expectedVariables: [{ name: 'aprovado', value: true }],
    },
  ],
  hints: [
    {
      id: 'prog-operators-004-hint-1',
      order: 1,
      text: 'Escreva as duas comparações separadamente antes de tentar juntá-las.',
    },
    {
      id: 'prog-operators-004-hint-2',
      order: 2,
      text: 'Quando as duas precisam ser verdadeiras ao mesmo tempo, o operador é and.',
    },
    {
      id: 'prog-operators-004-hint-3',
      order: 3,
      text: 'Envolva cada comparação em parênteses e use not para inverter o resultado final.',
    },
  ],
  skill: 'Combinar comparações com operadores lógicos em um único critério.',
  packages: [],
} satisfies Exercise

export default exercise
