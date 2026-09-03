# Magnolia — Instruções para Agentes

## 1. Sobre o produto

Magnolia é uma plataforma pessoal de aprendizado de:

- Programação
- Estatística
- Machine Learning
- Data Science

O objetivo é combinar aprendizado guiado com prática real de programação.

Fluxo pedagógico principal:

1. Conceito
2. Explicação
3. Exemplos
4. Prática
5. Execução do código
6. Avaliação automática
7. Feedback
8. Acompanhamento do progresso

A linguagem inicial é Python.

A arquitetura deve, porém, permitir a inclusão futura de:

- SQL
- Estatística
- Machine Learning
- Inteligência Artificial
- outros tipos de exercício

Um dos objetivos futuros do Magnolia é também ajudar na preparação para entrevistas técnicas, inclusive para vagas internacionais.

---

## 2. Escopo inicial

A primeira versão terá dois grandes caminhos de aprendizado:

### Programação

A progressão deverá incluir, ao longo do tempo:

- variáveis
- tipos
- operadores
- condicionais
- loops
- strings
- listas
- tuplas
- dicionários
- sets
- funções
- comprehensions
- tratamento de erros
- orientação a objetos
- algoritmos
- resolução de problemas
- desafios de lógica
- exercícios no estilo de entrevistas técnicas

A progressão poderá ser organizada aproximadamente em:

- Fundamentos
- Fácil
- Fácil+
- Intermediário I
- Intermediário II
- Intermediário III
- Avançado

Não implementar todos esses conteúdos de uma vez.

### Data Science

A progressão deverá incluir, ao longo do tempo:

- Python para Data Science
- NumPy
- Pandas I
- Pandas II
- análise exploratória
- estatística
- probabilidade
- Machine Learning
- casos aplicados de Data Science

Também não implementar todos esses conteúdos de uma vez.

---

## 3. Stack tecnológica

Stack atual planejada:

- React
- TypeScript
- Vite
- ESLint
- Tailwind CSS
- Monaco Editor
- Pyodide
- localStorage
- Vitest
- Git
- GitHub

Use novas dependências somente quando houver ganho claro.

Evite adicionar bibliotecas apenas por conveniência quando a funcionalidade puder ser implementada de maneira simples com a stack existente.

---

## 4. Restrições da V1

A V1 deve permanecer frontend-only.

Não introduzir nesta fase:

- backend
- banco de dados
- autenticação
- Docker
- microserviços
- APIs pagas
- APIs de LLM
- infraestrutura em nuvem desnecessária
- sistemas distribuídos
- complexidade arquitetural sem necessidade

O código Python do aluno deve executar diretamente no navegador através do Pyodide.

O progresso deve ser salvo inicialmente no localStorage.

---

## 5. Princípio de arquitetura

Separar claramente:

- interface
- conteúdo educacional
- execução Python
- avaliação de exercícios
- progresso
- tipos de domínio
- utilitários

Evitar misturar lógica de negócio com componentes visuais.

---

## 6. Estrutura de diretórios

A estrutura existente foi criada intencionalmente.

### content/

Contém o conteúdo educacional declarativo.

O conteúdo das aulas e exercícios NÃO deve ficar hardcoded dentro dos componentes React.

Estrutura inicial:

- content/programming/lessons
- content/programming/exercises
- content/data-science/lessons
- content/data-science/exercises

Adicionar um novo exercício deve exigir principalmente a criação de conteúdo, e não alterações em componentes React.

---

### src/components/

Componentes reutilizáveis de interface.

Subdiretórios:

- common
- editor
- exercise
- lesson
- progress

Evitar componentes gigantes.

---

### src/pages/

Páginas da aplicação.

Exemplos futuros:

- Dashboard
- Trilhas
- Aula
- Exercício
- Progresso

---

### src/layouts/

Layouts compartilhados entre páginas.

---

### src/engine/

Responsável pela execução e avaliação dos exercícios.

Subdiretórios:

- pythonRunner
- testRunner
- evaluator

A lógica desse diretório deve permanecer o mais independente possível da interface React.

---

### src/engine/pythonRunner/

Responsável exclusivamente pela execução de Python através do Pyodide.

Deve concentrar funcionalidades como:

- carregar Pyodide
- inicializar o runtime
- executar código Python
- capturar stdout
- capturar erros
- executar funções
- fornecer entradas para testes
- recuperar resultados

Não espalhar chamadas do Pyodide pelos componentes React.

Evitar reinicializar o Pyodide sem necessidade.

---

### src/engine/testRunner/

Responsável por executar os testes dos exercícios.

Deve receber informações estruturadas e devolver resultados estruturados.

Exemplo de informações de resultado:

- quantidade total de testes
- quantidade de testes aprovados
- quantidade de testes reprovados
- resultado individual de cada teste
- valor esperado
- valor recebido
- erro de execução, quando existir

O test runner não deve decidir como esses resultados serão visualmente apresentados.

---

### src/engine/evaluator/

Responsável pela interpretação dos resultados e geração de informações úteis para feedback.

Não revelar automaticamente a solução correta do exercício.

---

### src/progress/

Responsável por progresso e persistência.

Inicialmente usar localStorage.

Manter essa implementação isolada para permitir que, futuramente, localStorage seja substituído por backend sem reescrever toda a interface.

---

### src/types/

Tipos compartilhados do domínio Magnolia.

Utilizar TypeScript de maneira explícita para entidades importantes.

---

### src/hooks/

Hooks React reutilizáveis.

---

### src/utils/

Funções utilitárias pequenas e genéricas.

Não transformar `utils` em depósito de lógica de negócio.

---

### tests/

Testes automatizados.

---

## 7. Modelo de exercício

Os exercícios devem ser declarativos e fortemente tipados.

Um exercício Python poderá conter, conforme necessário:

- id
- título
- trilha
- tópico
- dificuldade
- descrição
- instruções
- código inicial
- exemplos
- dicas
- testes públicos
- testes internos
- comportamento esperado
- metadados

A implementação concreta poderá adaptar esses campos quando houver uma justificativa arquitetural.

Não acoplar o modelo de exercício aos componentes React.

---

## 8. Testes públicos e internos

O Magnolia deve suportar dois tipos conceituais de testes:

### Testes públicos

Podem fornecer ao aluno exemplos mais explícitos.

Exemplo:

entrada → saída esperada

### Testes internos

Servem para verificar casos adicionais e edge cases.

A implementação dos testes internos não deve ser apresentada diretamente ao aluno.

A interface poderá informar algo como:

4 de 5 testes passaram.

Sem necessariamente revelar todo o conteúdo do teste que falhou.

---

## 9. Experiência do exercício

Uma página de exercício deve progressivamente oferecer:

- título
- tópico
- dificuldade
- descrição
- instruções
- exemplos
- editor de código
- botão Executar
- estado de execução
- resultado dos testes
- feedback
- dicas
- exercício seguinte
- progresso

O editor deverá futuramente utilizar Monaco Editor.

Python deverá executar através do Pyodide.

---

## 10. Tratamento de erros

Erros do código do aluno fazem parte da experiência de aprendizado.

Tratar adequadamente:

- SyntaxError
- NameError
- TypeError
- ValueError
- IndexError
- erros de runtime
- resultado incorreto
- função ausente
- retorno inesperado

A interface não deve simplesmente quebrar quando o código Python possui erro.

O aluno deve receber uma mensagem útil.

---

## 11. Feedback pedagógico

Não fornecer imediatamente a solução completa.

Quando possível, o feedback deve ajudar o aluno a entender:

- qual teste falhou
- qual comportamento estava esperado
- o que seu código produziu
- que tipo de problema pode estar acontecendo

A progressão ideal é:

erro → feedback → nova tentativa → dica → nova tentativa

A solução completa não deve ser a primeira resposta.

---

## 12. Progresso

Inicialmente persistir progresso em localStorage.

O sistema deverá poder acompanhar informações como:

- exercícios iniciados
- exercícios concluídos
- número de tentativas
- tentativas corretas
- progresso por trilha
- progresso por tópico
- progresso por habilidade

No futuro poderão ser adicionadas informações como:

- tempo gasto
- taxa de acerto
- dificuldade média
- habilidades mais fracas
- revisão recomendada

Não construir toda a parte analítica na V1.

---

## 13. Dashboard

O Dashboard deverá futuramente permitir visualizar:

- progresso geral
- progresso de Programação
- progresso de Data Science
- exercícios recentes
- próximos conteúdos
- habilidades fortes
- habilidades que precisam de revisão

A V1 pode começar simples.

---

## 14. Princípios de UX

Magnolia é uma plataforma de aprendizado, não um clone de IDE.

Priorizar:

- clareza
- simplicidade
- foco
- baixo ruído visual
- boa hierarquia
- boa tipografia
- leitura confortável
- feedback claro
- progresso visível

A interface deve ter qualidade suficiente para também servir como projeto de portfólio.

Evitar:

- animações excessivas
- efeitos decorativos sem função
- excesso de cards
- excesso de informação simultânea
- visual genérico de dashboard corporativo

---

## 15. Qualidade de código

Preferir:

- componentes pequenos
- responsabilidade única
- tipos explícitos
- nomes claros
- fluxo de dados previsível
- separação de responsabilidades
- código legível
- abstrações apenas quando justificadas

Evitar:

- componentes gigantes
- duplicação de lógica
- abstrações prematuras
- overengineering
- hardcoding de conteúdo educacional nos componentes
- bibliotecas de gerenciamento de estado sem necessidade
- refactors amplos sem relação com a tarefa atual

---

## 16. Estado da aplicação

Na V1, preferir soluções simples do próprio React.

Não adicionar Redux, Zustand ou outra biblioteca global de estado sem uma necessidade real demonstrável.

---

## 17. Testes automatizados

Usar Vitest quando os testes forem configurados.

Priorizar testes das partes com maior risco lógico:

- evaluator
- testRunner
- progress
- transformação de conteúdo
- funções utilitárias relevantes

Não criar testes apenas para aumentar quantidade.

---

## 18. Validação obrigatória

Depois de alterações relevantes, executar:

    npm run lint
    npm run build

Quando Vitest estiver configurado:

    npm test

Corrigir problemas introduzidos pelo próprio trabalho antes de finalizar.

---

## 19. Forma de trabalhar

Antes de alterar código:

1. Inspecionar o repositório.
2. Entender o que já existe.
3. Verificar a arquitetura existente.
4. Preservar comportamentos funcionando.
5. Fazer apenas as alterações necessárias para a tarefa.

Quando a solicitação for de implementação, implementar.

Não responder apenas com um plano se a tarefa solicitar código funcional.

Não reescrever grandes partes do projeto simplesmente porque outra arquitetura também seria possível.

---

## 20. Decisões arquiteturais

Quando existir uma decisão realmente importante e ambígua:

- avaliar alternativas
- explicar brevemente o trade-off
- escolher a alternativa mais simples que preserve evolução futura

Não transformar decisões pequenas em discussões arquiteturais extensas.

---

## 21. Documentação

Manter alinhados com a implementação:

- README.md
- docs/ARCHITECTURE.md
- docs/ROADMAP.md
- docs/CONTENT_GUIDE.md
- AGENTS.md

Atualizar documentação quando a implementação mudar significativamente algo documentado.

---

## 22. Git

Não:

- apagar histórico
- fazer force push
- commitar segredos
- commitar credenciais
- commitar API keys
- commitar node_modules
- commitar dist

Respeitar o `.gitignore`.

Quando solicitado a criar commits, utilizar mensagens claras.

---

## 23. Escopo inicial de conteúdo

A primeira versão funcional poderá começar com aproximadamente 20 desafios.

Referência inicial:

### Programação

Aproximadamente 12 desafios cobrindo:

- variáveis
- condicionais
- loops
- strings
- listas
- funções
- dicionários
- sets
- comprehensions

### Data Science

Aproximadamente 8 desafios cobrindo inicialmente:

#### NumPy

- arrays
- indexação
- boolean masks
- operações vetorizadas

#### Pandas

- DataFrames
- filtros
- criação de colunas
- groupby

Essas quantidades são referências e podem ser ajustadas se houver justificativa.

---

## 24. Evolução futura

Possibilidades futuras incluem:

- SQL
- estatística interativa
- probabilidade
- Machine Learning
- orientação a objetos
- algoritmos avançados
- modo entrevista
- cronômetro
- exercícios sem dicas
- análise de complexidade
- edge cases
- skill analytics
- prática adaptativa
- tutor com IA
- contas de usuário
- backend
- persistência em nuvem

Não implementar funcionalidades futuras sem solicitação explícita.

---

## 25. Prioridades atuais

A ordem conceitual de prioridade é:

1. experiência funcional de aprendizado
2. execução Python funcionando no navegador
3. avaliação confiável dos exercícios
4. conteúdo inicial de Programação
5. conteúdo inicial de Data Science
6. persistência de progresso
7. experiência visual polida
8. expansão gradual de conteúdo

---

## 26. Regra principal

Magnolia deve crescer de forma incremental.

Antes de adicionar complexidade, perguntar:

"Isso é necessário para a versão atual?"

Se a resposta for não, normalmente não implementar ainda.