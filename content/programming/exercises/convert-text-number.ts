import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-variables-004',
  trackId: 'programming',
  topicId: 'programming-variables',
  title: 'Quando o número vem como texto',
  description:
    'Converta um valor de texto para número antes de usá-lo em uma conta.',
  order: 4,
  estimatedMinutes: 8,
  difficulty: 'Fácil',
  executionMode: 'script',
  instructions: [
    'A variável quantidade_texto guarda um número escrito como texto.',
    'Converta esse valor para inteiro e guarde o resultado em uma variável chamada quantidade.',
    'Exiba a frase no formato: Você tem 15 itens.',
    'Se somar sem converter, o Python levanta um TypeError — vale executar antes de corrigir, para ver o erro.',
  ],
  starterCode:
    'quantidade_texto = "12"\nadicionais = 3\n\n# Converta e calcule o total\n',
  examples: [
    {
      output: 'Você tem 15 itens.',
      explanation:
        'Depois da conversão, 12 e 3 são somados como números e o resultado entra na frase.',
    },
  ],
  hints: [
    {
      id: 'prog-variables-004-hint-1',
      order: 1,
      text: 'Para transformar um texto em número inteiro, use int.',
    },
    {
      id: 'prog-variables-004-hint-2',
      order: 2,
      text: 'Converta primeiro e só depois some; somar antes juntaria os caracteres.',
    },
    {
      id: 'prog-variables-004-hint-3',
      order: 3,
      text: 'A f-string aceita a conta direto entre chaves, mas guardar o total em uma variável deixa mais legível.',
    },
  ],
  skill: 'Converter texto em número antes de usá-lo em uma operação aritmética.',
  packages: [],
} satisfies Exercise

export default exercise
