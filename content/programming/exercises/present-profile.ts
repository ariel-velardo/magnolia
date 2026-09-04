import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-variables-001',
  trackId: 'programming',
  topicId: 'programming-variables',
  title: 'Apresentando um perfil',
  description:
    'Complete uma função que reúna um nome e uma idade em uma frase de apresentação.',
  order: 1,
  estimatedMinutes: 8,
  difficulty: 'Fundamentos',
  instructions: [
    'Implemente a função apresentar_perfil.',
    'Receba nome como texto e idade como número inteiro.',
    'Retorne uma frase no formato: nome tem idade anos.',
    'Não use print; a função deve retornar o texto.',
  ],
  starterCode:
    'def apresentar_perfil(nome, idade):\n    # Retorne a frase de apresentação.\n    pass',
  examples: [
    {
      input: "apresentar_perfil('Ana', 28)",
      output: "'Ana tem 28 anos.'",
    },
    {
      input: "apresentar_perfil('Caio', 19)",
      output: "'Caio tem 19 anos.'",
    },
  ],
  hints: [
    {
      id: 'prog-variables-001-hint-1',
      order: 1,
      text: 'Uma f-string permite inserir os dois parâmetros diretamente no texto.',
    },
    {
      id: 'prog-variables-001-hint-2',
      order: 2,
      text: 'Comece a string com a letra f e coloque cada nome de variável entre chaves.',
    },
    {
      id: 'prog-variables-001-hint-3',
      order: 3,
      text: 'Confira espaços e pontuação: o ponto final também faz parte do resultado.',
    },
  ],
  skill: 'Formatar dados de tipos diferentes em uma string.',
  packages: [],
} satisfies Exercise

export default exercise
