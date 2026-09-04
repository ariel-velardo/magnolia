import type { Lesson } from '../../../src/types'

const lesson = {
  id: 'prog-variables-intro',
  trackId: 'programming',
  topicId: 'programming-variables',
  title: 'Variáveis e tipos: dando nome aos dados',
  summary:
    'Entenda como Python representa textos, números e valores lógicos e como nomes claros tornam o código mais fácil de ler.',
  order: 1,
  estimatedMinutes: 8,
  objectives: [
    'Criar variáveis com nomes descritivos.',
    'Reconhecer os tipos str, int, float e bool.',
    'Combinar valores em uma expressão simples.',
  ],
  concept:
    'Uma variável associa um nome a um valor. O tipo desse valor determina quais operações fazem sentido para ele.',
  explanation: [
    'Em Python, você cria uma variável atribuindo um valor com o sinal de igual. Não é preciso declarar o tipo antes: Python o identifica a partir do valor.',
    'Textos usam o tipo str, números inteiros usam int, números decimais usam float e valores verdadeiro ou falso usam bool. Escolher nomes que expressem o significado do dado evita depender de comentários para entender o código.',
    'Uma nova atribuição pode atualizar o valor associado ao nome. Por isso, antes de usar uma variável, vale perguntar o que ela representa naquele ponto do programa.',
  ],
  examples: [
    {
      title: 'Descrevendo uma compra',
      description:
        'Cada valor recebe um nome e uma f-string reúne as informações em um texto legível.',
      code:
        "produto = 'Caderno'\nquantidade = 2\npreco_unitario = 18.5\ntotal = quantidade * preco_unitario\nmensagem = f'{quantidade} unidades de {produto}: R$ {total}'",
      output: '2 unidades de Caderno: R$ 37.0',
    },
  ],
  commonMistakes: [
    'Confundir =, que atribui um valor, com ==, que compara dois valores.',
    'Tentar somar diretamente um texto e um número sem fazer uma conversão ou usar uma f-string.',
    'Usar nomes genéricos como x quando o dado possui um significado claro.',
  ],
  relatedExerciseIds: ['prog-variables-001', 'prog-variables-002'],
} satisfies Lesson

export default lesson
