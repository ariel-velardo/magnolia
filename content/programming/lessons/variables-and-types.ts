import type { Lesson } from '../../../src/types'

const lesson = {
  id: 'prog-variables-intro',
  trackId: 'programming',
  topicId: 'programming-variables',
  title: 'Variáveis e tipos: dando nome aos dados',
  summary:
    'Guarde valores sob um nome, reconheça os tipos básicos do Python e monte mensagens com f-strings.',
  order: 1,
  estimatedMinutes: 15,
  objectives: [
    'Criar variáveis com nomes descritivos.',
    'Reconhecer os tipos str, int, float e bool.',
    'Consultar o tipo de um valor com type.',
    'Converter entre texto e número quando necessário.',
    'Montar mensagens com f-strings.',
  ],
  concept:
    'Uma variável é um nome que aponta para um valor. Depois de criada, você usa o nome no lugar do valor — e pode trocar o valor sem trocar o nome.',
  sections: [
    {
      title: 'Por que guardar um valor',
      paragraphs: [
        'No tópico anterior, todo valor era escrito diretamente dentro do print. Isso funciona para uma mensagem fixa, mas trava rápido: se o mesmo dado aparece em três lugares e precisa mudar, você teria de mudar nos três.',
        'Uma variável resolve isso. Você escreve um nome, um sinal de igual e o valor. A partir daí, o nome representa aquele valor em qualquer lugar do programa.',
        'O sinal de igual aqui não significa igualdade matemática: ele significa "guarde este valor sob este nome". A leitura correta é da direita para a esquerda.',
      ],
      examples: [
        {
          title: 'Criando e usando uma variável',
          description:
            'O nome cidade passa a representar o texto. O print recebe a variável, sem aspas — as aspas fariam dele imprimir a palavra "cidade".',
          code: 'cidade = "Porto Alegre"\nprint(cidade)',
          output: 'Porto Alegre',
        },
      ],
    },
    {
      title: 'O valor pode mudar; o nome permanece',
      paragraphs: [
        'Uma nova atribuição substitui o valor anterior. A variável passa a apontar para o novo valor, e o antigo é descartado.',
        'Por isso, ao ler um programa, a pergunta importante não é "o que essa variável é?", e sim "o que ela vale neste ponto?". O valor depende de tudo o que foi executado até ali.',
      ],
      examples: [
        {
          title: 'Reatribuindo um valor',
          description:
            'O primeiro print mostra o valor inicial; depois a variável é atualizada e o segundo print mostra o novo valor.',
          code:
            'saldo = 100\nprint(saldo)\n\nsaldo = 250\nprint(saldo)',
          output: '100\n250',
        },
      ],
    },
    {
      title: 'Os quatro tipos do começo',
      paragraphs: [
        'Todo valor em Python tem um tipo, e o tipo determina o que faz sentido fazer com ele. Quatro deles cobrem quase tudo no início.',
        'str guarda texto e sempre aparece entre aspas. int guarda números inteiros, sem casas decimais. float guarda números com casas decimais, escritos com ponto e não com vírgula. bool guarda apenas True ou False, com inicial maiúscula.',
        'Você não declara o tipo: o Python o deduz a partir do valor escrito. Para conferir, use type.',
      ],
      examples: [
        {
          title: 'Um valor de cada tipo',
          description:
            'A função type revela como o Python classificou cada valor.',
          code:
            'produto = "Caderno"      # str\nquantidade = 2           # int\npreco = 18.5             # float\nem_estoque = True        # bool\n\nprint(type(produto))\nprint(type(quantidade))\nprint(type(preco))\nprint(type(em_estoque))',
          output:
            "<class 'str'>\n<class 'int'>\n<class 'float'>\n<class 'bool'>",
        },
      ],
    },
    {
      title: 'Conversões: quando o tipo atrapalha',
      paragraphs: [
        'Somar dois números dá um número; somar dois textos junta os textos. Mas somar um texto com um número é um erro — o Python não adivinha qual das duas coisas você queria.',
        'Quando precisar mudar o tipo de um valor, use int, float ou str. Cada um devolve uma nova versão do valor no tipo pedido.',
        'Converter texto em número só funciona se o texto parecer um número: int("12") funciona, int("doze") não.',
      ],
      examples: [
        {
          title: 'Convertendo antes de calcular',
          description:
            'O primeiro valor chega como texto. Sem a conversão, a soma juntaria os caracteres em vez de somar.',
          code:
            'idade_texto = "28"\nidade = int(idade_texto)\n\nprint(idade + 2)',
          output: '30',
        },
      ],
    },
    {
      title: 'f-strings: montando mensagens',
      paragraphs: [
        'Para misturar texto e variáveis em uma frase, a forma mais legível é a f-string: coloque a letra f antes das aspas e escreva os nomes das variáveis entre chaves.',
        'O Python substitui cada trecho entre chaves pelo valor da variável, já convertido em texto. Isso evita conversões manuais e deixa a frase legível no código.',
      ],
      examples: [
        {
          title: 'Uma frase montada com f-string',
          description:
            'As chaves marcam onde cada valor entra. O resto do texto aparece exatamente como escrito.',
          code:
            'nome = "Ana"\nidade = 28\n\nprint(f"{nome} tem {idade} anos.")',
          output: 'Ana tem 28 anos.',
        },
      ],
    },
    {
      title: 'Nomes que explicam o dado',
      paragraphs: [
        'Um nome de variável pode conter letras, números e o caractere _, mas não pode começar com número nem conter espaços. Por convenção, em Python usam-se letras minúsculas separadas por _, como preco_unitario.',
        'Escolher bons nomes é parte de escrever código claro. Um nome como x obriga quem lê a procurar o significado; preco_unitario já explica.',
      ],
    },
  ],
  commonMistakes: [
    'Confundir =, que guarda um valor, com ==, que compara dois valores.',
    'Colocar a variável entre aspas dentro do print, o que imprime o nome em vez do valor.',
    'Somar texto com número sem converter — o Python levanta um TypeError.',
    'Escrever números decimais com vírgula em vez de ponto.',
    'Esquecer a letra f antes das aspas e ver {nome} aparecer literalmente na saída.',
  ],
  relatedExerciseIds: [
    'prog-variables-001',
    'prog-variables-002',
    'prog-variables-003',
    'prog-variables-004',
  ],
} satisfies Lesson

export default lesson
