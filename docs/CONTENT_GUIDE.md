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

Em exercício de **script** não existe entrada: o exemplo é a saída esperada do
programa, e o campo `input` fica ausente.

    Saída esperada:

    Total: 37.0

Quando necessário, mostrar mais de um exemplo.

Os exemplos não devem cobrir todos os edge cases utilizados nos testes.

---

## 11. Testes públicos

Testes públicos ajudam o aluno a compreender o comportamento esperado.

Devem testar casos representativos e simples.

Exemplo conceitual:

    soma(\[1, 2, 3]) == 6

---

## 12. Testes internos

Testes internos devem avaliar:

- edge cases;

- entradas diferentes dos exemplos;

- erros comuns;

- generalização da solução.

Não utilizar testes capciosos sem valor pedagógico.

Um teste interno deve verificar se o aluno realmente resolveu o problema, não tentar enganá-lo.

---

## 13. Comparação de resultados

Comparações simples podem utilizar igualdade.

Dados numéricos com ponto flutuante podem exigir tolerância.

Para NumPy e Pandas, utilizar comparadores adequados ao tipo de objeto.

Evitar validar objetos complexos através de conversão arbitrária para string.

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

