import type { Track } from '../src/types'

/**
 * A ordem dos tópicos é o currículo. Cada tópico só depende de conceitos já
 * apresentados, e `unlocksExecutionMode` marca onde exercícios de função passam
 * a ser permitidos — antes de Funções, toda prática é de script.
 *
 * A progressão completa planejada está em docs/PROGRAMMING_CURRICULUM.md.
 */
const tracks = [
  {
    id: 'programming',
    title: 'Programação',
    description:
      'Construa uma base sólida em Python enquanto desenvolve lógica, leitura de problemas e autonomia para escrever código.',
    order: 1,
    topics: [
      {
        id: 'programming-first-steps',
        trackId: 'programming',
        title: 'Primeiros passos',
        description:
          'Escreva seu primeiro programa, veja o computador responder e entenda o que é código.',
        order: 1,
        difficulty: 'Fundamentos',
        estimatedMinutes: 25,
        prerequisiteTopicIds: [],
      },
      {
        id: 'programming-variables',
        trackId: 'programming',
        title: 'Variáveis e tipos',
        description:
          'Guarde informações com nomes claros e reconheça os tipos básicos do Python.',
        order: 2,
        difficulty: 'Fundamentos',
        estimatedMinutes: 30,
        prerequisiteTopicIds: ['programming-first-steps'],
      },
      {
        id: 'programming-operators',
        trackId: 'programming',
        title: 'Operadores',
        description:
          'Faça contas, compare valores e combine condições para transformar dados em decisões.',
        order: 3,
        difficulty: 'Fundamentos',
        estimatedMinutes: 30,
        prerequisiteTopicIds: ['programming-variables'],
      },
      {
        id: 'programming-conditionals',
        trackId: 'programming',
        title: 'Condicionais',
        description:
          'Faça o programa escolher caminhos diferentes a partir de condições.',
        order: 4,
        difficulty: 'Fácil',
        estimatedMinutes: 30,
        prerequisiteTopicIds: ['programming-operators'],
      },
      {
        id: 'programming-lists',
        trackId: 'programming',
        title: 'Listas',
        description:
          'Organize coleções de valores e acesse partes delas por posição.',
        order: 5,
        difficulty: 'Fácil',
        estimatedMinutes: 30,
        prerequisiteTopicIds: ['programming-variables'],
      },
      {
        id: 'programming-loops',
        trackId: 'programming',
        title: 'Loops',
        description:
          'Repita instruções sobre uma coleção e construa resultados acumulados.',
        order: 6,
        difficulty: 'Fácil+',
        estimatedMinutes: 35,
        prerequisiteTopicIds: ['programming-lists', 'programming-conditionals'],
      },
      {
        id: 'programming-functions',
        trackId: 'programming',
        title: 'Funções',
        description:
          'Dê nome a um trecho de lógica, receba parâmetros e devolva resultados com return.',
        order: 7,
        difficulty: 'Fácil+',
        estimatedMinutes: 40,
        prerequisiteTopicIds: ['programming-loops'],
        unlocksExecutionMode: 'function',
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
        prerequisiteTopicIds: [],
        // Diferente de Programação, esta trilha pressupõe que o aluno já
        // escreve funções em Python. A revisão curricular de Data Science
        // ainda está pendente — ver docs/PROGRAMMING_CURRICULUM.md.
        unlocksExecutionMode: 'function',
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
        prerequisiteTopicIds: ['data-science-numpy-arrays'],
      },
    ],
  },
] as const satisfies readonly Track[]

export default tracks
