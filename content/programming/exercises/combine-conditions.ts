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
    'O aluno é aprovado quando tem nota maior ou igual a 7 E presença maior ou igual a 75.',
    'Guarde esse resultado em uma variável chamada aprovado.',
    'Exiba duas linhas: primeiro o valor de aprovado, depois o valor de aprovado invertido com not.',
    'Não use if nesta prática: apenas combine as comparações em uma expressão.',
  ],
  starterCode:
    'nota = 8.5\npresenca = 62\n\n# Combine os dois critérios\n',
  examples: [
    {
      output: 'False\nTrue',
      explanation:
        'A nota atende ao critério, mas a presença não. Como and exige as duas, o resultado é False.',
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
