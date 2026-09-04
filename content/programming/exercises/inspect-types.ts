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
  examples: [
    {
      output:
        "<class 'str'>\n<class 'int'>\n<class 'float'>\n<class 'bool'>",
      explanation:
        'Cada linha mostra como o Python classificou o valor guardado na variável.',
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
