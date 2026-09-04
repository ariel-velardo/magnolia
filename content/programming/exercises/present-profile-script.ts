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
    'As variáveis nome e idade já vêm definidas: a verificação roda o mesmo programa com valores diferentes.',
    'Monte uma frase no formato: Ana tem 28 anos.',
    'Exiba a frase com print, usando uma f-string para inserir as duas variáveis.',
    'O ponto final também faz parte da frase.',
  ],
  starterCode: '# Exiba a frase de apresentação\n',
  tests: [
    {
      id: 'prog-variables-003-case-1',
      visibility: 'public',
      label: "nome = 'Ana', idade = 28",
      initialVariables: { nome: 'Ana', idade: 28 },
      expectedStdout: 'Ana tem 28 anos.',
      explanation: 'O ponto final faz parte da frase.',
    },
    {
      id: 'prog-variables-003-case-2',
      visibility: 'public',
      label: "nome = 'Caio', idade = 19",
      initialVariables: { nome: 'Caio', idade: 19 },
      expectedStdout: 'Caio tem 19 anos.',
      explanation: 'A frase é montada a partir das variáveis, e não escrita à mão.',
    },
    {
      id: 'prog-variables-003-case-3',
      visibility: 'internal',
      label: "nome = 'Lourenço', idade = 102",
      initialVariables: { nome: 'Lourenço', idade: 102 },
      expectedStdout: 'Lourenço tem 102 anos.',
    },
    {
      id: 'prog-variables-003-case-4',
      visibility: 'internal',
      label: "nome = 'Bea', idade = 7",
      initialVariables: { nome: 'Bea', idade: 7 },
      expectedStdout: 'Bea tem 7 anos.',
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
