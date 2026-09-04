import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-variables-002',
  trackId: 'programming',
  topicId: 'programming-variables',
  title: 'Descobrindo o tipo de cada valor',
  description:
    'Crie variáveis dos quatro tipos básicos e confirme a classificação de cada uma com type.',
  order: 2,
  estimatedMinutes: 7,
  difficulty: 'Fundamentos',
  executionMode: 'script',
  instructions: [
    'Crie a variável titulo com o texto Relatório.',
    'Crie a variável paginas com o número inteiro 12.',
    'Crie a variável nota com o número decimal 8.5.',
    'Crie a variável revisado com o valor lógico True.',
    'Exiba o tipo das quatro variáveis, uma por linha, na mesma ordem.',
  ],
  starterCode:
    '# Crie as quatro variáveis\n\n\n# Exiba o tipo de cada uma\n',
  tests: [
    {
      id: 'prog-variables-002-case-1',
      visibility: 'public',
      label: 'Saída do programa',
      expectedStdout:
        "<class 'str'>\n<class 'int'>\n<class 'float'>\n<class 'bool'>",
      explanation: 'Uma linha por variável, na ordem em que foram criadas.',
    },
    {
      id: 'prog-variables-002-case-2',
      visibility: 'internal',
      label: 'As quatro variáveis existem com os valores certos',
      expectedVariables: [
        { name: 'titulo', value: 'Relatório' },
        { name: 'paginas', value: 12 },
        { name: 'nota', value: 8.5 },
        { name: 'revisado', value: true },
      ],
    },
  ],
  hints: [
    {
      id: 'prog-variables-002-hint-1',
      order: 1,
      text: 'Para ver o tipo de um valor, passe a variável para type.',
    },
    {
      id: 'prog-variables-002-hint-2',
      order: 2,
      text: 'Para exibir esse tipo, o resultado de type precisa ir dentro de um print.',
    },
    {
      id: 'prog-variables-002-hint-3',
      order: 3,
      text: 'Números decimais usam ponto, e True começa com letra maiúscula.',
    },
  ],
  skill: 'Reconhecer str, int, float e bool e consultar o tipo de um valor.',
  packages: [],
} satisfies Exercise

export default exercise
