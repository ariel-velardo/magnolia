import type { Lesson } from '../../../src/types'

const lesson = {
  id: 'prog-operators-intro',
  trackId: 'programming',
  topicId: 'programming-operators',
  title: 'Operadores: calcular, comparar e combinar',
  summary:
    'Use operadores para fazer contas, responder perguntas de sim ou não e juntar várias condições.',
  order: 1,
  estimatedMinutes: 15,
  objectives: [
    'Aplicar os operadores aritméticos, incluindo divisão inteira e resto.',
    'Comparar valores e obter um resultado booleano.',
    'Combinar condições com and, or e not.',
    'Prever a ordem em que as operações são avaliadas.',
  ],
  concept:
    'Operadores são símbolos que combinam valores para produzir um novo valor. Uns produzem números, outros produzem True ou False.',
  sections: [
    {
      title: 'Aritméticos: produzindo números',
      paragraphs: [
        'Os quatro primeiros são os de sempre: + soma, - subtrai, * multiplica e / divide. A divisão com / sempre produz um float, mesmo quando o resultado é exato: 6 / 3 dá 2.0, e não 2.',
        'Além deles, três aparecem o tempo todo em problemas reais. O // faz a divisão inteira, descartando a parte decimal. O % devolve o resto da divisão. O ** eleva um número a uma potência.',
        'O resto é mais útil do que parece: um número é par exatamente quando o resto da divisão por 2 é zero.',
      ],
      examples: [
        {
          title: 'Dividindo de três formas',
          description:
            'A mesma divisão produz resultados diferentes conforme o operador escolhido.',
          code:
            'print(7 / 2)    # divisão comum, resultado float\nprint(7 // 2)   # divisão inteira, descarta o resto\nprint(7 % 2)    # apenas o resto\nprint(2 ** 3)   # dois elevado a três',
          output: '3.5\n3\n1\n8',
        },
      ],
    },
    {
      title: 'Precedência: o que é calculado primeiro',
      paragraphs: [
        'Assim como na matemática, multiplicação e divisão são resolvidas antes de soma e subtração. A potência vem antes de todas.',
        'Quando a ordem natural não é a que você quer, use parênteses. Eles também ajudam quem lê: mesmo quando não mudam o resultado, tornam a intenção explícita.',
      ],
      examples: [
        {
          title: 'A mesma conta, dois resultados',
          description:
            'Sem parênteses, a multiplicação acontece antes da soma. Com parênteses, a soma vem primeiro.',
          code: 'print(2 + 3 * 4)\nprint((2 + 3) * 4)',
          output: '14\n20',
        },
      ],
    },
    {
      title: 'Comparação: perguntas de sim ou não',
      paragraphs: [
        'Os operadores de comparação são ==, !=, <, >, <= e >=. O resultado de qualquer um deles é sempre um bool: True ou False.',
        'Repare no ==, com dois sinais. Um sinal só guarda um valor em uma variável; dois sinais perguntam se dois valores são iguais. Confundir os dois é um dos erros mais comuns no começo.',
        'A comparação funciona também entre textos, seguindo a ordem alfabética, e entre um int e um float sem precisar converter.',
      ],
      examples: [
        {
          title: 'Comparando valores',
          description:
            'Cada comparação devolve um booleano, que pode ser exibido ou guardado em uma variável.',
          code:
            'nota = 8.5\n\nprint(nota >= 7)\nprint(nota == 10)\nprint(nota != 8.5)',
          output: 'True\nFalse\nFalse',
        },
      ],
    },
    {
      title: 'Lógicos: juntando condições',
      paragraphs: [
        'Um problema real raramente depende de uma única condição. Os operadores and, or e not combinam booleanos.',
        'and só é True quando as duas condições são verdadeiras. or é True quando pelo menos uma é. not inverte o resultado.',
        'Ao combinar comparações, envolva cada uma em parênteses. Não é sempre obrigatório, mas evita ambiguidade e deixa a leitura clara.',
      ],
      examples: [
        {
          title: 'Verificando duas condições ao mesmo tempo',
          description:
            'A aprovação exige nota suficiente e presença suficiente; basta uma falhar para o resultado ser False.',
          code:
            'nota = 8.5\npresenca = 62\n\naprovado = (nota >= 7) and (presenca >= 75)\nprint(aprovado)\nprint(not aprovado)',
          output: 'False\nTrue',
        },
      ],
    },
  ],
  commonMistakes: [
    'Usar = no lugar de == ao comparar dois valores.',
    'Esperar um inteiro de uma divisão com / — o resultado é sempre float.',
    'Escrever and e or com inicial maiúscula: em Python eles são minúsculos.',
    'Esquecer os parênteses ao combinar comparações e obter um resultado inesperado.',
    'Confundir % (resto) com porcentagem: são coisas diferentes.',
  ],
  relatedExerciseIds: [
    'prog-operators-001',
    'prog-operators-002',
    'prog-operators-003',
    'prog-operators-004',
  ],
} satisfies Lesson

export default lesson
