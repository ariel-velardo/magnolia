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

- descrição;

- instruções;

- starter code;

- exemplos;

- dicas;

- testes;

- metadados.

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

Exemplo adequado:

    def calcular\_media(valores):

        # escreva sua solução aqui

        pass

Evitar entregar grande parte da lógica pronta.

Também evitar exigir boilerplate que não faz parte do conhecimento sendo treinado.

---

## 10. Exemplos

Exemplos devem ajudar o usuário a entender o contrato do exercício.

Exemplo:

    Entrada:

    \[2, 4, 6]

    Saída esperada:

    12

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

    explicação

        ↓

    aplicação direta

        ↓

    pequena variação

        ↓

    combinação de conceitos

        ↓

    problema menos guiado

Não aumentar dificuldade apenas aumentando o tamanho do enunciado.

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

