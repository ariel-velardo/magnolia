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
    'As variáveis quantidade_texto e adicionais já vêm definidas: a verificação roda o mesmo programa com valores diferentes.',
    'A variável quantidade_texto guarda um número escrito como texto.',
    'Converta esse valor para inteiro e guarde o resultado em uma variável chamada quantidade.',
    'Exiba a frase no formato: Você tem 15 itens.',
    'Se somar sem converter, o Python levanta um TypeError — vale executar antes de corrigir, para ver o erro.',
  ],
  starterCode: '# Converta e calcule o total\n',
  tests: [
    {
      id: 'prog-variables-004-case-1',
      visibility: 'public',
      label: "quantidade_texto = '12', adicionais = 3",
      initialVariables: { quantidade_texto: '12', adicionais: 3 },
      expectedStdout: 'Você tem 15 itens.',
      expectedVariables: [{ name: 'quantidade', value: 12 }],
    },
    {
      id: 'prog-variables-004-case-2',
      visibility: 'public',
      label: "quantidade_texto = '40', adicionais = 2",
      initialVariables: { quantidade_texto: '40', adicionais: 2 },
      expectedStdout: 'Você tem 42 itens.',
      expectedVariables: [{ name: 'quantidade', value: 40 }],
      explanation: 'A mesma solução precisa valer para qualquer número que venha como texto.',
    },
    {
      id: 'prog-variables-004-case-3',
      visibility: 'internal',
      label: "quantidade_texto = '0', adicionais = 0",
      initialVariables: { quantidade_texto: '0', adicionais: 0 },
      expectedStdout: 'Você tem 0 itens.',
      expectedVariables: [{ name: 'quantidade', value: 0 }],
    },
    {
      id: 'prog-variables-004-case-4',
      visibility: 'internal',
      label: "quantidade_texto = '7', adicionais = 100",
      initialVariables: { quantidade_texto: '7', adicionais: 100 },
      expectedStdout: 'Você tem 107 itens.',
      expectedVariables: [{ name: 'quantidade', value: 7 }],
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
