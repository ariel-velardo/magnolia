import type { Lesson } from '../../../src/types'

const lesson = {
  id: 'prog-lists-intro',
  trackId: 'programming',
  topicId: 'programming-lists',
  title: 'Listas: guardando vários valores',
  summary:
    'Reúna valores relacionados em uma sequência, acesse itens por posição e recorte pedaços dela.',
  order: 1,
  estimatedMinutes: 14,
  objectives: [
    'Criar listas e medir seu tamanho.',
    'Acessar itens por índice, inclusive a partir do fim.',
    'Modificar e acrescentar itens.',
    'Recortar trechos com slicing.',
  ],
  concept:
    'Uma lista é uma coleção ordenada de valores guardada sob um único nome. Cada item ocupa uma posição, e a lista pode ser alterada depois de criada.',
  sections: [
    {
      title: 'Quando uma variável não basta',
      paragraphs: [
        'Até aqui, cada valor tinha seu próprio nome. Isso funciona para três medições, mas não para trinta: você não vai criar trinta variáveis.',
        'Uma lista guarda vários valores em um nome só. Escreva os itens entre colchetes, separados por vírgula. Os itens podem ser de qualquer tipo, e a lista mantém a ordem em que foram escritos.',
        'A função len informa quantos itens a lista tem — útil sempre que o tamanho não é conhecido de antemão.',
      ],
      examples: [
        {
          title: 'Criando uma lista',
          description:
            'A lista inteira é exibida com os colchetes; len conta os itens.',
          code:
            'duracoes = [20, 35, 15]\n\nprint(duracoes)\nprint(len(duracoes))',
          output: '[20, 35, 15]\n3',
        },
      ],
    },
    {
      title: 'Acessando itens por posição',
      paragraphs: [
        'Os índices começam em zero. O primeiro item está na posição 0, o segundo na 1, e assim por diante. Numa lista de três itens, o último índice válido é 2.',
        'Índices negativos contam a partir do fim: -1 é o último item, -2 o penúltimo. Isso evita ter de calcular len(lista) - 1 toda vez.',
        'Pedir um índice que não existe levanta um IndexError. É um erro comum e vale conhecê-lo desde já.',
      ],
      examples: [
        {
          title: 'Primeiro e último item',
          description:
            'O índice 0 pega o começo da lista; o índice -1 pega o fim, sem precisar saber o tamanho.',
          code:
            'cidades = ["Recife", "Curitiba", "Belém"]\n\nprint(cidades[0])\nprint(cidades[-1])',
          output: 'Recife\nBelém',
        },
      ],
    },
    {
      title: 'Listas mudam',
      paragraphs: [
        'Diferente de um texto, uma lista pode ser alterada depois de criada. Atribuir a uma posição troca o item que estava ali.',
        'Para acrescentar um item ao final, use append. Para remover pela posição, use pop. Ambos alteram a lista existente em vez de criar uma nova.',
      ],
      examples: [
        {
          title: 'Alterando e acrescentando',
          description:
            'A primeira posição é substituída e um novo item entra no fim da mesma lista.',
          code:
            'notas = [7.0, 8.5, 6.0]\n\nnotas[0] = 9.0\nnotas.append(10.0)\n\nprint(notas)',
          output: '[9.0, 8.5, 6.0, 10.0]',
        },
      ],
    },
    {
      title: 'Slicing: recortando um trecho',
      paragraphs: [
        'Um slice devolve uma nova lista com parte dos itens. A sintaxe é lista[inicio:fim], em que inicio entra no resultado e fim fica de fora.',
        'Essa regra parece estranha no começo, mas tem uma vantagem prática: a quantidade de itens do recorte é exatamente fim - inicio.',
        'Omitir um dos lados significa "do começo" ou "até o fim": lista[:2] pega os dois primeiros, lista[2:] pega do terceiro em diante.',
      ],
      examples: [
        {
          title: 'Dois recortes da mesma lista',
          description:
            'O primeiro slice pega as posições 1 e 2; o segundo pega tudo a partir da posição 2.',
          code:
            'valores = [10, 20, 30, 40]\n\nprint(valores[1:3])\nprint(valores[2:])',
          output: '[20, 30]\n[30, 40]',
        },
      ],
    },
  ],
  commonMistakes: [
    'Contar as posições a partir de 1 e acabar em um IndexError.',
    'Esperar que o índice final de um slice entre no resultado.',
    'Achar que append devolve a lista nova — ele altera a lista existente e devolve None.',
    'Confundir len(lista), que é a quantidade de itens, com o último índice válido.',
  ],
  relatedExerciseIds: ['prog-lists-001', 'prog-lists-002'],
} satisfies Lesson

export default lesson
