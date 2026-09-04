import type { Lesson } from '../../../src/types'

const lesson = {
  id: 'prog-conditionals-intro',
  trackId: 'programming',
  topicId: 'programming-conditionals',
  title: 'Condicionais: escolhendo um caminho',
  summary:
    'Use condições para adaptar o comportamento de um programa aos dados recebidos.',
  order: 1,
  estimatedMinutes: 10,
  objectives: [
    'Construir decisões com if, elif e else.',
    'Combinar comparações sem criar intervalos incorretos.',
    'Identificar a importância da indentação em Python.',
  ],
  concept:
    'Uma estrutura condicional executa apenas o bloco associado à primeira condição verdadeira.',
  explanation: [
    'O bloco if verifica uma condição. Quando ela é falsa, Python pode verificar condições adicionais com elif e, por fim, executar um caminho padrão com else.',
    'A ordem importa: assim que uma condição verdadeira é encontrada, as alternativas seguintes não são avaliadas. Organizar os casos do mais específico para o mais geral costuma deixar a decisão mais segura.',
    'A indentação define quais linhas pertencem a cada caminho. Mesmo uma comparação correta produz um programa incorreto se a instrução estiver no bloco errado.',
  ],
  examples: [
    {
      title: 'Classificando uma nota',
      description:
        'As condições são avaliadas em ordem e cobrem todos os valores possíveis.',
      code:
        "nota = 8.5\nif nota >= 9:\n    conceito = 'A'\nelif nota >= 7:\n    conceito = 'B'\nelse:\n    conceito = 'Em revisão'",
      output: 'B',
    },
  ],
  commonMistakes: [
    'Escrever condições sobrepostas na ordem errada e tornar um caminho inalcançável.',
    'Esquecer os dois-pontos depois de if, elif ou else.',
    'Usar vários if independentes quando apenas um dos caminhos deveria ser escolhido.',
  ],
  relatedExerciseIds: ['prog-conditionals-001'],
} satisfies Lesson

export default lesson
