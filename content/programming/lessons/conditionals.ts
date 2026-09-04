import type { Lesson } from '../../../src/types'

const lesson = {
  id: 'prog-conditionals-intro',
  trackId: 'programming',
  topicId: 'programming-conditionals',
  title: 'Condicionais: escolhendo um caminho',
  summary:
    'Use condições para adaptar o comportamento de um programa aos dados recebidos.',
  order: 1,
  estimatedMinutes: 14,
  objectives: [
    'Executar um trecho de código apenas quando uma condição for verdadeira.',
    'Construir decisões com if, elif e else.',
    'Organizar intervalos sem deixar caminhos inalcançáveis.',
    'Reconhecer o papel da indentação em Python.',
  ],
  concept:
    'Uma estrutura condicional escolhe qual trecho de código executar. O Python avalia as condições em ordem e executa apenas o bloco da primeira que for verdadeira.',
  sections: [
    {
      title: 'De uma comparação a uma decisão',
      paragraphs: [
        'No tópico anterior, uma comparação produzia True ou False e o programa apenas exibia esse resultado. Uma condicional vai além: ela usa esse booleano para decidir se um trecho de código será executado.',
        'A palavra if é seguida da condição e de dois-pontos. As linhas que devem rodar quando a condição for verdadeira ficam indentadas abaixo dela.',
        'Se a condição for falsa e não houver alternativa, o Python simplesmente pula o bloco e segue adiante.',
      ],
      examples: [
        {
          title: 'Executando só quando faz sentido',
          description:
            'O alerta só aparece porque o saldo é negativo. A última linha roda sempre, pois não está indentada.',
          code:
            'saldo = -40\n\nif saldo < 0:\n    print("Atenção: saldo negativo")\n\nprint("Fim da verificação")',
          output: 'Atenção: saldo negativo\nFim da verificação',
        },
      ],
    },
    {
      title: 'A indentação define o bloco',
      paragraphs: [
        'Em muitas linguagens, chaves marcam onde um bloco começa e termina. Em Python, quem faz isso é a indentação — o espaço em branco no início da linha.',
        'A convenção é usar quatro espaços. O essencial é ser consistente: linhas com a mesma indentação pertencem ao mesmo bloco.',
        'Este é o ponto em que a indentação deixa de ser estética e passa a mudar o comportamento do programa. Uma linha indentada por engano roda apenas às vezes; uma linha desindentada por engano roda sempre.',
      ],
    },
    {
      title: 'else e elif: as alternativas',
      paragraphs: [
        'O else define o que fazer quando a condição do if for falsa. Ele não tem condição própria: é o caminho padrão.',
        'Quando existem mais de dois casos, o elif acrescenta condições adicionais, testadas apenas se as anteriores falharem. Você pode encadear quantos elif precisar.',
        'A ordem importa. Assim que uma condição verdadeira é encontrada, o Python executa aquele bloco e ignora o resto da estrutura — mesmo que outra condição abaixo também fosse verdadeira.',
      ],
      examples: [
        {
          title: 'Classificando uma nota',
          description:
            'As condições cobrem todos os valores possíveis, do caso mais restritivo ao mais geral.',
          code:
            'nota = 8.5\n\nif nota >= 9:\n    conceito = "A"\nelif nota >= 7:\n    conceito = "B"\nelse:\n    conceito = "Em revisão"\n\nprint(conceito)',
          output: 'B',
        },
      ],
    },
    {
      title: 'Intervalos sem armadilhas',
      paragraphs: [
        'Ao escrever faixas de valores, cada elif já pode contar com o fato de as condições anteriores terem falhado. No exemplo acima, o segundo teste não precisa verificar nota < 9: se a execução chegou ali, a nota é menor que 9.',
        'Isso simplifica bastante as condições, mas exige atenção à ordem. Se o caso mais geral vier primeiro, os mais específicos abaixo nunca serão alcançados.',
      ],
    },
  ],
  commonMistakes: [
    'Escrever condições sobrepostas na ordem errada e tornar um caminho inalcançável.',
    'Esquecer os dois-pontos depois de if, elif ou else.',
    'Misturar quantidades diferentes de espaços na indentação de um mesmo bloco.',
    'Usar vários if independentes quando apenas um dos caminhos deveria ser escolhido.',
    'Colocar uma condição no else, que por definição não tem condição.',
  ],
  relatedExerciseIds: ['prog-conditionals-001', 'prog-conditionals-002'],
} satisfies Lesson

export default lesson
