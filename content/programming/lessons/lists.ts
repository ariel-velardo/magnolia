import type { Lesson } from '../../../src/types'

const lesson = {
  id: 'prog-lists-intro',
  trackId: 'programming',
  topicId: 'programming-lists',
  title: 'Listas: trabalhando com coleções',
  summary:
    'Reúna valores relacionados em uma sequência e processe cada item sem repetir código.',
  order: 1,
  estimatedMinutes: 12,
  objectives: [
    'Criar listas e acessar elementos por índice.',
    'Percorrer uma lista com for.',
    'Construir um resultado acumulado a partir dos itens.',
  ],
  concept:
    'Uma lista é uma coleção ordenada e mutável. Ela permite guardar vários valores sob um único nome.',
  explanation: [
    'Os itens de uma lista mantêm uma ordem e são acessados por índices que começam em zero. O primeiro item está na posição 0, o segundo na posição 1 e assim por diante.',
    'Quando a intenção é processar todos os itens, um laço for costuma expressar melhor o objetivo do que acessar cada índice manualmente.',
    'Muitos problemas usam um acumulador: uma variável começa com um valor neutro e é atualizada a cada item. Uma soma, por exemplo, normalmente começa em zero.',
  ],
  examples: [
    {
      title: 'Somando tempos de estudo',
      description:
        'O laço percorre cada duração e atualiza o total acumulado.',
      code:
        'duracoes = [20, 35, 15]\ntotal = 0\nfor minutos in duracoes:\n    total = total + minutos',
      output: '70',
    },
  ],
  commonMistakes: [
    'Tentar acessar um índice que não existe na lista.',
    'Reiniciar o acumulador dentro do laço e perder o resultado anterior.',
    'Alterar a lista enquanto ela está sendo percorrida sem considerar os efeitos.',
  ],
  relatedExerciseIds: ['prog-lists-001'],
} satisfies Lesson

export default lesson
