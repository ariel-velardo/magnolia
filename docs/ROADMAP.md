# Roadmap do Magnolia

## Visão

O Magnolia será desenvolvido incrementalmente.

O objetivo da primeira versão não é possuir grande quantidade de conteúdo.

O objetivo é provar que o ciclo completo funciona:

**aprender → programar → executar → testar → receber feedback → registrar progresso**

---

## Fase 0 — Fundação

Status: concluída.

Inclui:

- criação do projeto;

- React;

- TypeScript;

- Vite;

- ESLint;

- Git;

- GitHub;

- estrutura inicial de diretórios;

- documentação base;

- instruções para agentes.

Critério de conclusão:

    npm run lint

    npm run build

devem funcionar sem erro.

---

## Fase 1 — Estrutura do produto

Status: concluída.

Objetivo:

transformar o scaffold do Vite em uma aplicação Magnolia navegável.

Implementar:

- identidade visual inicial;

- layout principal;

- navegação;

- Dashboard;

- visualização de trilhas;

- página de aula;

- página de exercício;

- tipos de domínio;

- carregamento declarativo de conteúdo.

Ainda não é necessário executar Python nesta fase para todas as telas.

Entrega realizada: recorte declarativo navegável com 2 trilhas, 5 aulas e 7
exercícios, incluindo páginas de conteúdo e prévias de código ainda sem
execução.

Critério de conclusão:

o usuário consegue navegar desde o Dashboard até um exercício real carregado a partir do conteúdo.

---

## Fase 2 — Ambiente de programação

Objetivo:

permitir escrever e executar Python.

Implementar:

- Monaco Editor;

- integração com Pyodide;

- estado de carregamento;

- execução de código;

- captura de stdout;

- captura de exceptions;

- feedback de erro de sintaxe e runtime.

Critério de conclusão:

o usuário consegue escrever Python no editor e executar o código no navegador.

---

## Fase 3 — Sistema de avaliação

Objetivo:

transformar execução em prática estruturada.

Implementar:

- modelo de TestCase;

- test runner;

- evaluator;

- testes públicos;

- testes internos;

- comparação expected vs received;

- resumo de testes;

- feedback de erro.

Critério de conclusão:

um exercício consegue informar automaticamente quantos testes foram aprovados e orientar o usuário quando existem falhas.

---

## Fase 4 — Progresso

Objetivo:

registrar evolução do usuário.

Implementar:

- localStorage;

- exercícios iniciados;

- exercícios concluídos;

- número de tentativas;

- progresso por trilha;

- progresso por tópico;

- cards de progresso no Dashboard.

Critério de conclusão:

fechar e reabrir o navegador não apaga o progresso local.

---

## Fase 5 — Conteúdo inicial

Objetivo:

transformar a infraestrutura em uma plataforma utilizável.

Referência inicial:

### Programação

Aproximadamente 12 desafios sobre:

- variáveis;

- condicionais;

- loops;

- strings;

- listas;

- funções;

- dicionários;

- sets;

- comprehensions.

### Data Science

Aproximadamente 8 desafios.

NumPy:

- arrays;

- indexação;

- boolean masks;

- operações vetorizadas.

Pandas:

- DataFrames;

- filtros;

- criação de colunas;

- groupby.

Cada bloco de conteúdo deve possuir contexto e exemplos antes dos exercícios quando necessário.

---

## Fase 6 — Qualidade da V1

Objetivo:

transformar o protótipo funcional em uma aplicação sólida.

Revisar:

- responsividade;

- acessibilidade;

- estados vazios;

- loading;

- mensagens de erro;

- consistência visual;

- navegação;

- feedback;

- tipos;

- testes automatizados;

- documentação.

Executar:

    npm test

    npm run lint

    npm run build

---

# Definição de V1 concluída

A V1 será considerada funcional quando:

- existir Dashboard;

- existirem trilhas de Programação e Data Science;

- existirem aulas ou contexto didático;

- exercícios forem carregados declarativamente;

- houver editor Monaco;

- Python executar com Pyodide;

- testes automáticos funcionarem;

- erros Python forem tratados;

- feedback for apresentado;

- progresso persistir em localStorage;

- houver aproximadamente 20 exercícios iniciais;

- lint passar;

- build passar;

- testes relevantes passarem.

---

# Pós-V1

## Expansão de Programação

- orientação a objetos;

- recursão;

- algoritmos;

- estruturas de dados;

- problemas intermediários;

- problemas avançados.

## Estatística

- estatística descritiva;

- distribuições;

- probabilidade;

- amostragem;

- intervalos de confiança;

- testes de hipótese;

- regressão.

## Machine Learning

- preparação de dados;

- treino e teste;

- regressão;

- classificação;

- métricas;

- validação;

- feature engineering;

- overfitting;

- casos aplicados.

## SQL

Criar nova engine de exercícios para:

- SELECT;

- filtros;

- agregações;

- joins;

- window functions;

- CTEs;

- desafios de entrevistas.

## Modo entrevista

Possibilidades:

- cronômetro;

- sem dicas;

- testes parcialmente ocultos;

- análise de edge cases;

- discussão de complexidade;

- desafios no estilo de processos seletivos internacionais.

## Analytics de aprendizado

Possibilidades:

- taxa de acerto;

- tentativas por exercício;

- tempo por exercício;

- dificuldade percebida;

- habilidades fortes;

- habilidades fracas;

- sugestões de revisão.

## Inteligência Artificial

Avaliar futuramente:

- tutor contextual;

- geração de dicas;

- explicação de erros;

- recomendação adaptativa.

IA não faz parte da infraestrutura necessária da V1.

---

# Regra de roadmap

Não iniciar uma fase futura apenas porque ela parece interessante.

Primeiro garantir que a fase atual entrega valor e está funcionando corretamente.

