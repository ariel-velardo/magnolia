# Currículo da trilha de Programação

## 1. Objetivo

Este documento registra a progressão pedagógica da trilha de Programação: em
que ordem os conceitos aparecem, o que cada tópico pode cobrar e por quê.

A regra que organiza tudo o resto é simples:

**um exercício só pode exigir o que já foi ensinado.**

A trilha precisa funcionar para alguém que nunca programou. Isso significa que o
primeiro exercício não pode pressupor função, laço ou estrutura de dados — nem
mesmo variável.

---

## 2. O problema que originou este documento

Na primeira versão, a trilha começava em "Variáveis e tipos" e o primeiro
exercício pedia:

    def apresentar_perfil(nome, idade):

Um aluno iniciante precisaria escrever uma função antes de saber o que é uma
função. Os tipos não impediam isso, nenhuma checagem existia, e o erro só
apareceria quando alguém tentasse de fato usar a plataforma do zero.

A correção tem três partes:

1. uma progressão explícita, documentada aqui;
2. um modelo que separa exercício de script de exercício de função;
3. uma validação automática que recusa exercício de função antes de Funções.

---

## 3. Progressão planejada

A trilha completa segue esta sequência. A coluna de situação indica o que já
existe no `content/`.

| # | Tópico | Conteúdo | Situação |
|---|---|---|---|
| 0 | Primeiros passos | o que é código, `print`, comentários, valores literais | implementado |
| 1 | Variáveis e tipos | criação, reatribuição, `int`, `float`, `str`, `bool`, `type`, conversões | implementado |
| 2 | Operadores | aritméticos, comparação, lógicos | implementado |
| 3 | Strings | concatenação, f-strings, indexação, métodos básicos | planejado |
| 4 | Booleanos e comparações | valores lógicos, expressões booleanas | planejado |
| 5 | Condicionais | `if`, `else`, `elif`, condições compostas | implementado (parcial) |
| 6 | Listas | criação, acesso, modificação, métodos, slicing | implementado (parcial) |
| 7 | Loops | `for`, `range`, `while`, acumuladores | implementado (parcial) |
| 8 | Outras estruturas | `tuple`, `dict`, `set` | planejado |
| 9 | Funções | `def`, parâmetros, `return`, escopo básico | implementado (parcial) |
| 10 | Comprehensions | list/dict comprehensions | planejado |
| 11 | Tratamento de erros | `try`, `except`, exceções comuns | planejado |
| 12 | Orientação a objetos | classes, atributos, métodos | planejado |
| 13 | Algoritmos e entrevistas | arrays, strings, hash maps, edge cases, complexidade | planejado |

Strings e Booleanos ainda não têm tópico próprio: parte do conteúdo aparece
dentro de Variáveis (f-strings) e Operadores (comparações). Quando forem
criados, os tópicos seguintes têm sua `order` renumerada, e os
`prerequisiteTopicIds` de cada um devem ser revisados.

`while` ainda não é coberto pela aula de Loops, que trata apenas de `for` e
`range`.

---

## 4. Ordem e pré-requisitos

A ordem é dada por `Topic.order` dentro da trilha. Os pré-requisitos são
declarados em `Topic.prerequisiteTopicIds`.

`order` sozinho já sequencia a trilha, mas não expressa dependências que não são
lineares — Loops depende de Listas *e* de Condicionais, e comprehensions vão
depender de Listas, Loops e Funções ao mesmo tempo. Por isso os dois existem.

O catálogo valida, em desenvolvimento e nos testes, que todo pré-requisito
existe, é da mesma trilha e tem `order` menor que o tópico que o declara.

Dependências atuais:

    Primeiros passos
        ↓
    Variáveis e tipos
        ↓
    Operadores ──────────────┐
        ↓                    │
    Condicionais ────────────┤
                             ↓
    Listas ──────────────→ Loops
                             ↓
                          Funções

Não há grafo de conceitos nem sistema de habilidades. A lista de pré-requisitos
por tópico resolve o que precisa ser resolvido hoje.

---

## 5. Modos de execução

Um exercício declara em `executionMode` como o aluno escreve o código.

### `script`

O aluno escreve instruções soltas, de cima para baixo, e o resultado observável
é a saída do programa.

    nome = "Ana"
    idade = 28
    print(f"{nome} tem {idade} anos.")

É o único modo possível antes de Funções, e cobre Primeiros passos, Variáveis,
Operadores, Strings, Condicionais, Listas e Loops.

### `function`

O aluno implementa uma função cujo nome é fixado pelo exercício em `entryPoint`.

    def calcular_total(preco_unitario, quantidade):
        return preco_unitario * quantidade

Só é permitido a partir do tópico marcado com `unlocksExecutionMode: 'function'`
— na trilha de Programação, o tópico Funções.

`entryPoint` existe **apenas** em exercícios de função: o tipo `Exercise` é uma
união discriminada, então um exercício de script não tem como declará-lo.

---

## 6. O que cada tópico pode cobrar

Um exercício não pode exigir conhecimento de tópicos posteriores ao seu. Na
prática:

| Tópico | Pode usar | Ainda não pode usar |
|---|---|---|
| Primeiros passos | `print`, literais, comentários | variáveis |
| Variáveis e tipos | tudo acima, variáveis, `type`, conversões, f-strings | operadores além de `+` e `*` simples |
| Operadores | tudo acima, `//`, `%`, `**`, comparações, `and`/`or`/`not` | `if` |
| Condicionais | tudo acima, `if`/`elif`/`else`, indentação de bloco | listas |
| Listas | tudo acima, listas, índices, `append`, slicing | `for` |
| Loops | tudo acima, `for`, `range`, acumuladores | `def` |
| Funções | tudo acima, `def`, parâmetros, `return` | — |

A tabela é uma orientação para quem escreve conteúdo. O que o catálogo verifica
automaticamente é a regra de `def`, que era a violação concreta e verificável.
As demais dependem de revisão humana.

---

## 7. Progressão dentro de um tópico

Um tópico não é uma explicação curta seguida de um desafio. A sequência esperada
é:

    conceito
        ↓
    explicação
        ↓
    exemplo comentado
        ↓
    prática guiada
        ↓
    prática direta
        ↓
    pequena variação
        ↓
    desafio

A aula cobre as três primeiras etapas. `Lesson.sections` permite alternar
explicação e exemplo quantas vezes o conceito exigir, em vez de despejar um
único bloco de texto.

As quatro últimas etapas são exercícios, ordenados por `Exercise.order` e
diferenciados por `Exercise.difficulty`:

| Etapa | Como se reconhece | Dificuldade típica |
|---|---|---|
| Prática guiada | starter code quase pronto, uma lacuna | Fundamentos |
| Prática direta | o aluno escreve o trecho inteiro | Fundamentos |
| Pequena variação | o mesmo conceito em outro formato | Fácil |
| Desafio | combina o conceito com os anteriores | Fácil+ |

Não há campo para isso no modelo: `order` e `difficulty` já expressam a
progressão, e um enum a mais seria estrutura sem uso.

Referência de volume para fundamentos: **4 a 8 práticas por tópico**. Os três
primeiros tópicos têm 4 cada, o suficiente para a progressão ficar visível.

---

## 8. Situação do conteúdo

| Tópico | Aulas | Exercícios | Modo |
|---|---|---|---|
| Primeiros passos | 1 | 4 | script |
| Variáveis e tipos | 1 | 4 | script |
| Operadores | 1 | 4 | script |
| Condicionais | 1 | 2 | script |
| Listas | 1 | 2 | script |
| Loops | 1 | 2 | script |
| Funções | 1 | 2 | function |

Condicionais, Listas, Loops e Funções estão coerentes mas ainda abaixo da
referência de 4 a 8 práticas. São os próximos a completar.

---

## 9. Data Science

A trilha de Data Science **ainda não passou** por esta revisão curricular. Seus
três exercícios são de função, e o primeiro tópico declara
`unlocksExecutionMode: 'function'` porque a trilha pressupõe que o aluno já sabe
programar em Python.

Essa premissa precisa ser decidida de forma explícita: ou a trilha declara
Programação como pré-requisito, ou ganha seus próprios tópicos iniciais. Os
mesmos princípios deste documento devem ser aplicados a ela depois que a trilha
de Programação estiver completa.

---

## 10. Ao acrescentar conteúdo

1. Confirme o tópico correto pela tabela da seção 6.
2. Se o exercício exige `def`, ele pertence a Funções ou depois.
3. Escreva a aula em seções, alternando explicação e exemplo comentado.
4. Ordene os exercícios do guiado ao desafio.
5. Rode `npm test`: as regras de ordem, pré-requisito e modo de execução são
   verificadas em `tests/curriculum.test.ts`.

As regras de escrita — títulos, ids, dificuldade, starter code, dicas — estão em
`docs/CONTENT_GUIDE.md`.
