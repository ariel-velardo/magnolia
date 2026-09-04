import type { Lesson } from '../../../src/types'

const lesson = {
  id: 'prog-first-steps-intro',
  trackId: 'programming',
  topicId: 'programming-first-steps',
  title: 'Primeiros passos: conversando com o computador',
  summary:
    'Descubra o que é um programa, escreva sua primeira linha de Python e veja o computador responder.',
  order: 1,
  estimatedMinutes: 12,
  objectives: [
    'Entender o que acontece quando um programa é executado.',
    'Exibir mensagens na tela com print.',
    'Escrever comentários para explicar o próprio código.',
    'Reconhecer texto e número como coisas diferentes.',
  ],
  concept:
    'Um programa é uma lista de instruções que o computador executa na ordem em que foram escritas, de cima para baixo.',
  sections: [
    {
      title: 'O que é código, afinal',
      paragraphs: [
        'Escrever código é dar instruções para o computador em uma linguagem que ele entende. Python é uma dessas linguagens, e foi escolhida aqui porque suas instruções se parecem bastante com frases em inglês.',
        'O computador não adivinha o que você quer. Ele faz exatamente o que está escrito, na ordem em que está escrito. Isso é uma boa notícia: quando algo dá errado, a explicação está sempre no código, e não em um capricho da máquina.',
        'Cada linha do seu programa é uma instrução. O Python lê a primeira, executa, passa para a segunda, e assim por diante até acabar.',
      ],
    },
    {
      title: 'print: como o programa fala com você',
      paragraphs: [
        'Um programa que só calcula coisas sem mostrar nada parece não ter feito nada. A instrução print exibe um valor na tela — é a forma mais direta de acompanhar o que está acontecendo.',
        'Escreva print, abra parênteses, coloque o que quer mostrar e feche os parênteses. Os parênteses fazem parte da instrução: sem eles, o Python não entende que você quer imprimir algo.',
        'Cada print escreve em uma linha nova. Três prints produzem três linhas.',
      ],
      examples: [
        {
          title: 'Uma mensagem por linha',
          description:
            'As instruções são executadas de cima para baixo, e cada print ocupa a sua própria linha na saída.',
          code:
            'print("Bom dia")\nprint("Vamos programar")',
          output: 'Bom dia\nVamos programar',
        },
      ],
    },
    {
      title: 'Texto e número não são a mesma coisa',
      paragraphs: [
        'Repare nas aspas do exemplo anterior. Elas marcam o começo e o fim de um texto. Para o Python, "10" entre aspas é um texto formado pelos caracteres 1 e 0; já 10 sem aspas é o número dez, com o qual dá para fazer contas.',
        'Valores escritos diretamente no código, como "Bom dia" ou 10, são chamados de valores literais: eles são literalmente o que está escrito ali.',
        'O print aceita mais de um valor de uma vez, separados por vírgula. Ele exibe todos na mesma linha, com um espaço entre eles.',
      ],
      examples: [
        {
          title: 'Texto, número e os dois juntos',
          description:
            'O primeiro print mostra um texto; o segundo, o resultado de uma conta; o terceiro combina os dois na mesma linha.',
          code:
            'print("10")\nprint(10 + 5)\nprint("Total:", 15)',
          output: '10\n15\nTotal: 15',
        },
      ],
    },
    {
      title: 'Comentários: notas para quem lê',
      paragraphs: [
        'Tudo o que vem depois de um # em uma linha é ignorado pelo Python. Isso permite escrever observações no meio do código, dirigidas a outra pessoa — ou a você mesmo daqui a duas semanas.',
        'Bons comentários explicam a intenção, não repetem o óbvio. Escrever "# imprime o nome" acima de um print(nome) não acrescenta nada; explicar por que aquele valor importa, sim.',
      ],
      examples: [
        {
          title: 'Um comentário e uma instrução',
          description:
            'A primeira linha é só para quem lê o código. A segunda é a única que produz saída.',
          code:
            '# Mensagem de boas-vindas do programa\nprint("Olá, Magnolia")',
          output: 'Olá, Magnolia',
        },
      ],
    },
  ],
  commonMistakes: [
    'Esquecer de fechar os parênteses ou as aspas — o Python avisa com um SyntaxError.',
    'Escrever Print com letra maiúscula: o Python diferencia maiúsculas de minúsculas.',
    'Esperar ver algo na tela sem usar print. Calcular não é o mesmo que exibir.',
    'Colocar um número entre aspas quando a intenção era fazer uma conta com ele.',
  ],
  relatedExerciseIds: [
    'prog-first-steps-001',
    'prog-first-steps-002',
    'prog-first-steps-003',
    'prog-first-steps-004',
  ],
} satisfies Lesson

export default lesson
