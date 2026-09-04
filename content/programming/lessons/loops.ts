import type { Lesson } from '../../../src/types'

const lesson = {
  id: 'prog-loops-intro',
  trackId: 'programming',
  topicId: 'programming-loops',
  title: 'Loops: repetindo sem repetir código',
  summary:
    'Percorra uma coleção item a item e construa resultados que dependem de todos eles.',
  order: 1,
  estimatedMinutes: 15,
  objectives: [
    'Percorrer uma lista com for.',
    'Gerar sequências de números com range.',
    'Acumular um resultado ao longo das repetições.',
    'Combinar loop e condicional para tratar apenas alguns itens.',
  ],
  concept:
    'Um loop executa o mesmo bloco várias vezes, uma para cada item de uma coleção. A cada repetição, uma variável assume o valor do item atual.',
  sections: [
    {
      title: 'Percorrendo uma lista',
      paragraphs: [
        'No tópico anterior, cada item era acessado pelo seu índice. Isso funciona quando você sabe quantos itens existem, mas não escala: uma lista com cem valores exigiria cem linhas.',
        'O for resolve isso. Você dá um nome à variável que representará o item atual, indica de onde vêm os itens e escreve o bloco indentado que deve rodar para cada um.',
        'Ao final da última repetição, o programa continua na primeira linha não indentada depois do loop.',
      ],
      examples: [
        {
          title: 'Um bloco por item',
          description:
            'A variável minutos assume cada valor da lista, uma repetição por vez.',
          code:
            'duracoes = [20, 35, 15]\n\nfor minutos in duracoes:\n    print(minutos)\n\nprint("Fim")',
          output: '20\n35\n15\nFim',
        },
      ],
    },
    {
      title: 'range: quando você quer números, não itens',
      paragraphs: [
        'Nem todo loop percorre uma lista existente. Quando o que você precisa é repetir algo um número determinado de vezes, use range.',
        'range(5) produz os números de 0 a 4 — cinco números, começando em zero e parando antes do limite, exatamente como o slicing.',
        'Com dois argumentos, range(2, 6) começa no 2 e para antes do 6.',
      ],
      examples: [
        {
          title: 'Contando de 1 a 3',
          description:
            'O range começa em 1 e para antes do 4, produzindo três repetições.',
          code: 'for numero in range(1, 4):\n    print(numero)',
          output: '1\n2\n3',
        },
      ],
    },
    {
      title: 'Acumuladores: construindo um resultado',
      paragraphs: [
        'Muitos problemas pedem um único resultado que depende de todos os itens: uma soma, uma contagem, um maior valor.',
        'O padrão é sempre o mesmo. Antes do loop, crie uma variável com um valor neutro — zero para somas, zero para contagens. Dentro do loop, atualize essa variável usando o item atual. Depois do loop, ela guarda o resultado final.',
        'O detalhe que mais confunde é onde cada linha fica. Se a variável for criada dentro do loop, ela reinicia a cada repetição e o resultado se perde. Se o print ficar dentro do loop, você vê resultados parciais em vez do total.',
      ],
      examples: [
        {
          title: 'Somando uma lista',
          description:
            'O total nasce em zero fora do loop, cresce a cada item e só é exibido depois que todos foram percorridos.',
          code:
            'duracoes = [20, 35, 15]\ntotal = 0\n\nfor minutos in duracoes:\n    total = total + minutos\n\nprint(total)',
          output: '70',
        },
      ],
    },
    {
      title: 'Tratando apenas alguns itens',
      paragraphs: [
        'Um if dentro do loop permite decidir, item a item, se aquele valor deve entrar no resultado. O bloco do if fica indentado duas vezes: uma por estar no loop, outra por estar na condição.',
        'Esse é o encontro dos dois tópicos anteriores — e um dos padrões mais frequentes em programação.',
      ],
      examples: [
        {
          title: 'Contando aprovados',
          description:
            'O contador só aumenta quando a condição é verdadeira; o loop continua nos demais casos.',
          code:
            'notas = [9.0, 5.5, 7.5]\naprovados = 0\n\nfor nota in notas:\n    if nota >= 7:\n        aprovados = aprovados + 1\n\nprint(aprovados)',
          output: '2',
        },
      ],
    },
  ],
  commonMistakes: [
    'Criar o acumulador dentro do loop, reiniciando-o a cada repetição.',
    'Colocar o print dentro do loop quando a intenção era exibir só o resultado final.',
    'Esquecer que range para antes do limite indicado.',
    'Errar a indentação do if dentro do for e aplicar a condição fora de hora.',
    'Alterar a lista enquanto ela está sendo percorrida.',
  ],
  relatedExerciseIds: ['prog-loops-001', 'prog-loops-002'],
} satisfies Lesson

export default lesson
