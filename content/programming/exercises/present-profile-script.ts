import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-variables-003',
  trackId: 'programming',
  topicId: 'programming-variables',
  title: 'Apresentando um perfil',
  description:
    'Reúna um nome e uma idade em uma frase de apresentação usando uma f-string.',
  order: 3,
  estimatedMinutes: 8,
  difficulty: 'Fundamentos',
  executionMode: 'script',
  instructions: [
    'Use as variáveis nome e idade que já estão criadas.',
    'Monte uma frase no formato: Ana tem 28 anos.',
    'Exiba a frase com print, usando uma f-string para inserir as duas variáveis.',
    'O ponto final também faz parte da frase.',
  ],
  starterCode:
    'nome = "Ana"\nidade = 28\n\n# Exiba a frase de apresentação\n',
  examples: [
    {
      output: 'Ana tem 28 anos.',
      explanation:
        'A f-string substitui {nome} e {idade} pelos valores das variáveis.',
    },
  ],
  hints: [
    {
      id: 'prog-variables-003-hint-1',
      order: 1,
      text: 'Uma f-string começa com a letra f antes das aspas.',
    },
    {
      id: 'prog-variables-003-hint-2',
      order: 2,
      text: 'Coloque cada nome de variável entre chaves, dentro do texto.',
    },
    {
      id: 'prog-variables-003-hint-3',
      order: 3,
      text: 'Confira os espaços e a pontuação: a saída precisa bater caractere a caractere.',
    },
  ],
  skill: 'Formatar dados de tipos diferentes em uma única string.',
  packages: [],
} satisfies Exercise

export default exercise
