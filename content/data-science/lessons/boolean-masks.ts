import type { Lesson } from '../../../src/types'

const lesson = {
  id: 'ds-numpy-boolean-masks-intro',
  trackId: 'data-science',
  topicId: 'data-science-boolean-masks',
  title: 'Boolean masks: selecionando observações',
  summary:
    'Transforme critérios em arrays booleanos e use-os para filtrar apenas as observações relevantes.',
  order: 1,
  estimatedMinutes: 12,
  objectives: [
    'Criar uma máscara a partir de uma comparação vetorizada.',
    'Filtrar um array com uma máscara booleana.',
    'Combinar critérios com operadores adequados ao NumPy.',
  ],
  concept:
    'Uma boolean mask contém True ou False para cada posição e seleciona os elementos associados aos valores verdadeiros.',
  explanation: [
    'Comparar um array com um limite produz outro array, agora booleano. Cada posição registra se o valor correspondente atende ou não ao critério.',
    'Ao usar a máscara entre colchetes, o NumPy retorna somente os elementos marcados como True. Essa operação mantém explícita a relação entre critério e seleção.',
    'Para combinar comparações, use & para “e” e | para “ou”, colocando cada comparação entre parênteses. Os operadores and e or não avaliam arrays elemento a elemento.',
  ],
  examples: [
    {
      title: 'Filtrando vendas acima da meta',
      description:
        'A comparação cria a máscara e a indexação retorna as vendas elegíveis.',
      code:
        'import numpy as np\n\nvendas = np.array([80, 125, 95, 160])\nacima_da_meta = vendas >= 120\nvendas_selecionadas = vendas[acima_da_meta]',
      output: 'array([125, 160])',
    },
  ],
  commonMistakes: [
    'Usar and ou or no lugar de & ou | ao combinar comparações de arrays.',
    'Omitir parênteses ao combinar duas condições.',
    'Aplicar uma máscara com tamanho incompatível com o array filtrado.',
  ],
  relatedExerciseIds: ['ds-numpy-masks-001'],
} satisfies Lesson

export default lesson
