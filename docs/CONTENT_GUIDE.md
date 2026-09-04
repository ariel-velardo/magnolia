# Guia de Conteúdo do Magnolia

## 1. Objetivo

Este documento define como criar aulas e exercícios para o Magnolia.

O conteúdo deve ser didático, progressivo e orientado à prática.

O objetivo não é apenas apresentar sintaxe.

O aluno deve entender:

- o conceito;

- por que ele existe;

- como utilizá-lo;

- erros comuns;

- como resolver problemas utilizando o conceito.

---

## 2. Fluxo pedagógico

Sempre que fizer sentido, seguir:

    Conceito

        ↓

    Explicação

        ↓

    Exemplo

        ↓

    Exercício

        ↓

    Execução

        ↓

    Feedback

        ↓

    Nova tentativa

Evitar saltar diretamente para exercícios difíceis sem fornecer contexto suficiente.

---

## 3. Linguagem

O conteúdo inicial deve ser escrito em português brasileiro.

O texto deve ser:

- claro;

- direto;

- didático;

- tecnicamente correto;

- sem formalidade excessiva.

Evitar:

- frases motivacionais genéricas;

- linguagem corporativa;

- explicações excessivamente abstratas;

- parágrafos enormes;

- jargão sem explicação.

Termos técnicos em inglês podem ser mantidos quando forem padrão da área.

Exemplos:

- DataFrame;

- feature;

- overfitting;

- train/test split;

- groupby;

- boolean mask.

---

## 4. Aula

Uma aula é escrita como uma sequência de seções (`Lesson.sections`), cada uma
com título, parágrafos e, quando ajudar, exemplos de código comentados.

Alternar explicação e exemplo várias vezes é melhor do que um único bloco de
texto seguido de um exemplo solitário. A página não conhece o assunto: quantas
seções existem e onde cada exemplo entra é decisão de quem escreve o conteúdo.

Antes das seções vem o campo `concept`: uma frase que responde "o que é isso?"
sem depender de nenhum detalhe.

Uma aula deve responder, quando aplicável:

### O que é?

Explicar o conceito.

### Por que usar?

Mostrar o problema que ele resolve.

### Como funciona?

Apresentar a lógica.

### Exemplo

Mostrar uma aplicação simples.

### Cuidados

Apresentar erros comuns ou limitações.

### Prática

Conectar a aula aos exercícios relacionados.

---

## 5. Exercício

Um exercício deve possuir um objetivo principal claro.

Evitar desafios que testem cinco conceitos novos ao mesmo tempo.

Um exercício pode conter:

- título;

- tópico;

- dificuldade;

- modo de execução;

- descrição;

- instruções;

- starter code;

- exemplos;

- dicas;

- testes;

- metadados.

### Modo de execução

Todo exercício declara em `executionMode` como o aluno escreve o código.

`script`: o aluno escreve instruções de cima para baixo e o resultado é a saída
do programa. É o único modo possível antes do tópico Funções.

`function`: o aluno implementa a função nomeada em `entryPoint`. Só existe a
partir do tópico marcado com `unlocksExecutionMode: 'function'`.

`entryPoint` só existe em exercícios de função — o tipo é uma união
discriminada, e um exercício de script não consegue declará-lo.

**Nunca peça `def` a um aluno que ainda não estudou funções.** A progressão que
determina isso está em `docs/PROGRAMMING_CURRICULUM.md`, e a regra é verificada
automaticamente pelo catálogo e por `tests/curriculum.test.ts`.

---

## 6. Títulos

Títulos devem explicar o desafio de forma curta.

Preferir:

    Somando valores de uma lista

    Encontrando o maior número

    Filtrando clientes ativos

    Média por categoria

Evitar:

    Desafio 01

    Exercício Python

    Teste de conhecimento

---

## 7. IDs

IDs devem ser estáveis e legíveis.

Sugestão:

    prog-variables-001

    prog-loops-001

    prog-functions-002

    ds-numpy-001

    ds-pandas-groupby-001

Depois de publicado, evitar alterar o ID de um exercício porque ele poderá estar associado ao progresso salvo.

---

## 8. Dificuldade

A dificuldade deve refletir o raciocínio exigido, não apenas o tamanho do código.

Escala inicial:

### Fundamentos

Aplicação direta de um conceito recém-apresentado.

### Fácil

Exige pequena combinação de conceitos conhecidos.

### Fácil+

Exige interpretação um pouco maior ou tratamento de casos simples.

### Intermediário I

Combina diferentes conceitos e exige decomposição do problema.

### Intermediário II

Exige maior autonomia e atenção a edge cases.

### Intermediário III

Problema significativamente menos guiado.

### Avançado

Pode envolver algoritmos, decisões de design ou raciocínio mais complexo.

Não é necessário preencher todos os níveis na V1.

---

## 9. Starter code

O starter code deve reduzir trabalho irrelevante sem resolver o desafio.

Em exercício de **script**, ele prepara os dados e marca onde o aluno escreve:

    preco_unitario = 18.5
    quantidade = 2

    # Calcule o total e exiba a frase

Em exercício de **função**, ele traz a assinatura já pronta — o aluno preenche o
corpo, e não a definição:

    def calcular_media(valores):
        # escreva sua solução aqui
        pass

Evitar entregar grande parte da lógica pronta.

Também evitar exigir boilerplate que não faz parte do conhecimento sendo treinado.

O starter code de um exercício de script **não pode conter `def`**.

### print dentro e fora da função

Enquanto o test runner não existe, um exercício de função não produz saída
nenhuma sozinha — e ver a tela vazia é o comportamento correto.

Para o aluno conferir o retorno, o starter code inclui uma linha de inspeção
*fora* da função:

    def calcular_total(preco_unitario, quantidade):
        # Calcule e devolva o total
        pass


    # Linha de inspeção: fora da função, só para conferir o retorno
    print(calcular_total(18.5, 2))

As duas orientações convivem sem se contradizer, e o enunciado deve deixar isso
explícito:

- **dentro** da função, use `return` e não `print` — o objetivo é entregar o
  valor a quem chamou;
- **fora** da função, `print(funcao(...))` é uma ferramenta de inspeção
  temporária, que não faz parte da solução.

---

## 10. Exemplos

Exemplos devem ajudar o usuário a entender o contrato do exercício.

Em exercício de **função**, o exemplo tem chamada e retorno:

    Chamada:

    calcular_total(18.5, 2)

    Retorno esperado:

    37.0

Em exercício de **script** o exemplo é a saída esperada do programa. Quando o
caso declara entrada, ela aparece antes:

    Valores iniciais:

    preco_unitario = 18.5, quantidade = 2

    Saída esperada:

    Total: 37.0

Quando necessário, mostrar mais de um exemplo.

Os exemplos não devem cobrir todos os edge cases utilizados nos testes.

---

## 11. Testes públicos

Testes públicos ajudam o aluno a compreender o comportamento esperado.

Devem testar casos representativos e simples.

Eles são a **fonte dos exemplos** exibidos no enunciado: a página deriva os
exemplos dos casos públicos, então não existe um campo separado para isso e não
há como o exemplo dizer uma coisa e o teste cobrar outra.

Todo exercício precisa de pelo menos um caso público.

Em exercício de função:

    { id: 'ex-case-1', visibility: 'public', args: [18.5, 2], expected: 37, tolerance: 1e-9 }

Em exercício de script:

    { id: 'ex-case-1', visibility: 'public',
      label: 'preco_unitario = 18.5, quantidade = 2',
      initialVariables: { preco_unitario: 18.5, quantidade: 2 },
      expectedStdout: 'Total: 37.0' }

Declare `tolerance` quando o valor for float. Além de cobrir o erro de
representação, é o sinal que faz a interface escrever `37.0` em vez de `37`.

---

## 12. Testes internos

Testes internos devem avaliar:

- edge cases;

- entradas diferentes dos exemplos;

- erros comuns;

- generalização da solução.

Não utilizar testes capciosos sem valor pedagógico.

Um teste interno deve verificar se o aluno realmente resolveu o problema, não tentar enganá-lo.

O aluno vê apenas a contagem — "1 teste interno ainda falhou" — e uma orientação
genérica sobre casos de limite. Entrada, esperado e recebido não são exibidos.

### O que um caso interno acrescenta em cada modo

Em **exercício de função**, o caso interno usa argumentos diferentes dos
exemplos. É o que separa quem resolveu o problema de quem acertou os dois casos
mostrados.

Em **exercício de script** o caso interno acrescenta duas coisas: outra entrada
em `initialVariables` e outra dimensão de observação — verificar o estado final
com `expectedVariables` pega uma saída escrita à mão que o teste de `stdout`
sozinho aprovaria:

    { id: 'ex-case-2', visibility: 'internal',
      label: 'preco_unitario = 8.75, quantidade = 0',
      initialVariables: { preco_unitario: 8.75, quantidade: 0 },
      expectedStdout: 'Total: 0.0',
      expectedVariables: [{ name: 'total', value: 0, tolerance: 1e-9 }] }

Quando um caso interno depende de uma variável, o enunciado precisa nomeá-la.
Cobrar um nome que o exercício não pediu é injusto.

Avalie sempre comportamento e estado, **nunca o texto do código**: duas soluções
diferentes que produzem o mesmo resultado são igualmente corretas.

### Entrada de um exercício de script

Um caso de script pode declarar `initialVariables`: nomes já ligados a valores
no momento em que o código do aluno começa a rodar. É a entrada do exercício, no
mesmo papel que `args` tem em um caso de função.

    initialVariables: { temperatura: 8 }

O test runner cria um namespace novo, coloca esses nomes nele e só então executa
o código. **Nada é acrescentado ao texto do aluno**: a linha apontada por um
`SyntaxError` ou por um traceback continua sendo a linha que ele vê no editor.

Declare **dados**, nunca código de preparação. Os valores reutilizam os mesmos
tipos dos argumentos de função: int, float, str, bool, `null`, listas e o
marcador `{ kind: 'ndarray', items: [...] }`. Não existe forma de passar um
trecho de Python como setup, e isso é deliberado.

**Quando usar.** Sempre que a solução dependa de um dado — condicionais,
operadores, listas, loops, conversões, contas. Um caso com entrada fixa aprova
quem escreveu a resposta à mão: em um exercício de temperatura, `classificacao =
"agradável"` passaria. Varie a entrada entre os casos para que a mesma solução
seja cobrada em situações diferentes:

    temperatura = 8   →  frio
    temperatura = 21  →  agradável
    temperatura = 32  →  quente

Nada disso exige função: o aluno continua escrevendo um script de cima para
baixo.

**Quando não usar.** Exercícios de `print` puro e exercícios em que o próprio
aluno cria as variáveis. Ali não há entrada, e injetar uma não mediria nada a
mais.

**Regras que o catálogo cobra.**

- Ou todos os casos do exercício declaram os mesmos nomes, ou nenhum declara:
  um caso sem a variável que os outros recebem levantaria `NameError`.
- O starter code **não pode atribuir** um nome injetado. A atribuição rodaria
  depois da injeção e sobrescreveria a entrada de todos os casos. Em vez de
  `temperatura = 21` no editor, o enunciado diz que a variável já existe.
- O enunciado precisa nomear as variáveis de entrada, como já precisa nomear as
  variáveis cobradas em `expectedVariables`.

**Cuidado com float inteiro.** Os valores atravessam JSON, e `7.0` chega ao
Python como `7` (int). Quando o tipo aparece na saída — `Total: 0.0` — declare
valores com casa decimal significativa (`8.75`, `12.5`, `6.25`).

---

## 13. Comparação de resultados

Comparações simples podem utilizar igualdade.

Dados numéricos com ponto flutuante podem exigir tolerância.

Para NumPy e Pandas, utilizar comparadores adequados ao tipo de objeto.

Evitar validar objetos complexos através de conversão arbitrária para string.

### O que os comparadores atuais fazem

- **Número**: comparado pelo valor, como o Python faz — `2 == 2.0`. Com
  `tolerance`, a margem é a declarada; sem ela, há uma margem mínima para
  absorver o erro de representação de float.
- **Booleano**: não casa com número. Em Python `True == 1`, mas confundir os
  dois é justamente o erro que interessa apontar.
- **Texto**: igualdade exata.
- **None**: só casa com `null` declarado. Uma função sem `return` devolve `None`
  e reprova — é o erro mais comum do tópico de Funções.
- **Lista**: item a item, com o mesmo tamanho. Um `ndarray` ou uma `tuple` são
  aceitos onde uma lista é esperada.
- **Saída do programa**: quebras de linha finais são ignoradas; espaços,
  acentos e pontuação no meio são significativos.

Um tipo que o Magnolia ainda não sabe comparar — um `set`, por exemplo — é
reportado como tal em vez de reprovar silenciosamente.

### Argumentos NumPy

Quando a função precisa receber um array, e não uma lista, declare o argumento
assim:

    args: [{ kind: 'ndarray', items: [0, 10, 20] }]

O valor esperado continua sendo uma lista: o comparador aceita o ndarray de
volta, porque o conteúdo declara os valores e não a estrutura que os carrega.

---

## 14. Feedback

Feedback deve ajudar sem entregar imediatamente a solução.

Uma boa sequência é:

    tentativa

        ↓

    teste falha

        ↓

    indicação do comportamento incorreto

        ↓

    nova tentativa

        ↓

    dica

        ↓

    nova tentativa

Quando apropriado, mostrar:

- entrada;

- esperado;

- recebido.

Para testes internos, mostrar apenas as informações pedagogicamente necessárias.

---

## 15. Dicas

Dicas devem possuir progressão.

### Dica 1

Direciona para o conceito.

### Dica 2

Direciona para uma estratégia.

### Dica 3

Pode ser mais explícita, sem necessariamente fornecer a solução completa.

Evitar começar com código pronto.

---

## 16. Soluções

Pode existir solução de referência para manutenção e validação.

Ela não deve ser apresentada automaticamente na interface do aluno.

Também não deve ser necessária para avaliar todas as respostas.

A avaliação deve verificar comportamento, não exigir que o código do aluno seja igual à solução de referência.

---

## 17. Programação

Os exercícios de Programação devem desenvolver gradualmente:

- sintaxe;

- lógica;

- decomposição;

- leitura de problemas;

- tratamento de casos;

- clareza de solução.

Não transformar a trilha inteira em desafios de algoritmo estilo LeetCode.

O Magnolia também deve ensinar antes de cobrar.

---

## 18. Entrevistas técnicas

Problemas no estilo de entrevistas devem aparecer progressivamente.

Eles podem trabalhar:

- arrays;

- strings;

- hash maps;

- sets;

- loops;

- funções;

- edge cases;

- complexidade.

Antes de desafios mais difíceis, o usuário deve possuir base suficiente.

---

## 19. NumPy

Exercícios iniciais devem priorizar:

- criação de arrays;

- shape;

- indexação;

- slicing;

- boolean masks;

- operações vetorizadas;

- agregações.

Quando o objetivo for ensinar NumPy, evitar soluções dependentes de loops Python quando a intenção pedagógica for vetorização.

---

## 20. Pandas

Exercícios iniciais devem priorizar:

- criação e leitura de DataFrames pequenos;

- seleção de colunas;

- filtros;

- criação de colunas;

- ordenação;

- agregações;

- groupby.

Datasets devem ser pequenos e determinísticos na V1.

Evitar dependência de internet ou APIs externas para exercícios básicos.

---

## 21. Estatística

Quando conteúdo de Estatística for introduzido, evitar exercícios que consistam apenas em aplicar fórmulas.

Sempre que possível, conectar:

- cálculo;

- interpretação;

- contexto.

Exemplo:

não apenas calcular uma média, mas interpretar o que ela representa no problema.

---

## 22. Machine Learning

Conteúdo futuro deve enfatizar raciocínio antes de biblioteca.

Exemplos:

- por que separar treino e teste;

- o que significa overfitting;

- por que determinada métrica é adequada;

- como interpretar erro;

- como evitar leakage.

Não transformar a trilha em tutorial de chamadas do scikit-learn.

---

## 23. Dados dos exercícios

Na V1, preferir dados:

- pequenos;

- determinísticos;

- embutidos;

- fáceis de compreender;

- rápidos de executar.

Evitar downloads externos durante exercícios.

---

## 24. Progressão

Um tópico deve evoluir aproximadamente assim:

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

As três primeiras etapas são a aula; as demais são exercícios, ordenados por
`order` e diferenciados por `difficulty`.

Referência de volume para tópicos de fundamentos: **4 a 8 práticas por tópico**.

Não aumentar dificuldade apenas aumentando o tamanho do enunciado.

A ordem dos tópicos, seus pré-requisitos e o que cada um pode cobrar estão em
`docs/PROGRAMMING_CURRICULUM.md`.

---

## 25. Qualidade

Antes de considerar um exercício pronto, verificar:

- o objetivo está claro?

- o enunciado é suficiente?

- starter code está correto?

- exemplos estão corretos?

- testes cobrem comportamento relevante?

- existe pelo menos um caso além do exemplo?

- feedback é útil?

- a dificuldade está coerente?

- a solução não está exposta?

- o exercício funciona no runtime atual?

- o conteúdo ensina algo relevante?

---

## 26. Princípio principal

Todo exercício deve conseguir responder:

**Qual habilidade exatamente este exercício está treinando?**

Se não houver uma resposta clara, o exercício provavelmente precisa ser redesenhado.

