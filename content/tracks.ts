import type { Track } from '../src/types'

const tracks = [
  {
    id: 'programming',
    title: 'Programação',
    description:
      'Construa uma base sólida em Python enquanto desenvolve lógica, leitura de problemas e autonomia para escrever código.',
    order: 1,
    topics: [
      {
        id: 'programming-variables',
        trackId: 'programming',
        title: 'Variáveis e tipos',
        description:
          'Aprenda a representar informações com nomes claros e tipos adequados.',
        order: 1,
        difficulty: 'Fundamentos',
        estimatedMinutes: 25,
      },
      {
        id: 'programming-conditionals',
        trackId: 'programming',
        title: 'Condicionais',
        description:
          'Faça o programa escolher caminhos diferentes a partir de condições.',
        order: 2,
        difficulty: 'Fundamentos',
        estimatedMinutes: 30,
      },
      {
        id: 'programming-lists',
        trackId: 'programming',
        title: 'Listas',
        description:
          'Organize coleções de valores e percorra dados de forma previsível.',
        order: 3,
        difficulty: 'Fácil',
        estimatedMinutes: 35,
      },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description:
      'Use Python para explorar dados e desenvolver o raciocínio que sustenta análises confiáveis.',
    order: 2,
    topics: [
      {
        id: 'data-science-numpy-arrays',
        trackId: 'data-science',
        title: 'Arrays com NumPy',
        description:
          'Conheça arrays e aplique operações vetorizadas a pequenos conjuntos de dados.',
        order: 1,
        difficulty: 'Fundamentos',
        estimatedMinutes: 30,
      },
      {
        id: 'data-science-boolean-masks',
        trackId: 'data-science',
        title: 'Boolean masks',
        description:
          'Selecione observações que atendem a critérios sem escrever loops manuais.',
        order: 2,
        difficulty: 'Fácil',
        estimatedMinutes: 30,
      },
    ],
  },
] as const satisfies readonly Track[]

export default tracks
