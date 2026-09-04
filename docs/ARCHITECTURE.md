# Arquitetura do Magnolia

## 1. Objetivo

Este documento descreve a arquitetura técnica do Magnolia.

A arquitetura deve permitir que o produto comece simples, frontend-only, mas possa evoluir sem exigir uma reescrita completa.

Os principais domínios do sistema são:

- conteúdo educacional;

- interface;

- execução de código;

- avaliação;

- feedback;

- progresso.

---

## 2. Princípios

A arquitetura deve priorizar:

- simplicidade;

- separação de responsabilidades;

- baixo acoplamento;

- tipagem explícita;

- conteúdo separado da interface;

- facilidade para adicionar exercícios;

- facilidade para adicionar novas tecnologias no futuro.

Evitar abstrações criadas apenas para antecipar problemas que ainda não existem.

---

## 3. Arquitetura de alto nível

O fluxo conceitual principal é:

    Conteúdo

       ↓

    Página de exercício

       ↓

    Editor

       ↓

    Python Runner

       ↓

    Test Runner

       ↓

    Evaluator

       ↓

    Feedback

       ↓

    Progress

Cada camada deve possuir responsabilidade clara.

### Implementação atual

Na Fase 1, o catálogo carrega aulas e exercícios declarativos com
`import.meta.glob` em modo eager. A navegação usa a History API do navegador,
sem dependência de roteamento. O progresso mínimo é centralizado e registra
somente aulas visualizadas (`viewedLessonIds`) e exercícios iniciados
(`startedExerciseIds`); tentativas, conclusão e métricas completas continuam
previstas para a Fase 4.

Ao publicar a aplicação em hospedagem estática, o host deve redirecionar rotas
profundas para `index.html`. Essa configuração de deploy não faz parte da Fase 1.

---

## 4. Conteúdo

O conteúdo educacional vive fora dos componentes React.

Diretórios:

    content/programming/

    content/data-science/

Cada trilha contém:

    lessons/

    exercises/

O objetivo é permitir que novos exercícios sejam adicionados principalmente através de novos arquivos de conteúdo.

Componentes React não devem possuir enunciados, soluções ou testes específicos hardcoded.

---

## 5. Modelo de domínio

Os principais tipos deverão ser definidos em:

    src/types/

Entidades conceituais esperadas incluem:

### Lesson

Representa conteúdo didático.

Pode conter:

- id;

- título;

- trilha;

- tópico;

- nível;

- objetivos;

- explicação;

- exemplos;

- exercícios relacionados.

### Exercise

Representa um desafio executável.

Pode conter:

- id;

- título;

- trilha;

- tópico;

- dificuldade;

- descrição;

- instruções;

- starterCode;

- exemplos;

- hints;

- testes;

- metadados.

### TestCase

Representa um caso utilizado para avaliar a solução.

Pode conter:

- id;

- tipo;

- entrada;

- saída esperada;

- visibilidade;

- tolerância, quando necessária.

### TestResult

Representa o resultado de um teste.

Pode conter:

- status;

- valor recebido;

- valor esperado;

- erro;

- mensagem.

### ExerciseResult

Representa o resultado completo da submissão.

Pode conter:

- total de testes;

- testes aprovados;

- testes reprovados;

- resultados individuais;

- erro de execução;

- status final.

### Progress

Representa o progresso local do usuário.

Pode conter:

- exercícios iniciados;

- exercícios concluídos;

- tentativas;

- acertos;

- progresso por trilha;

- progresso por tópico.

Esses modelos poderão evoluir conforme a implementação real mostrar necessidade.

---

## 6. Interface

Componentes vivem em:

    src/components/

Subdomínios:

    common/

    editor/

    exercise/

    lesson/

    progress/

Páginas vivem em:

    src/pages/

Layouts compartilhados vivem em:

    src/layouts/

A camada visual deve consumir estados e resultados estruturados.

Ela não deve executar diretamente lógica do Pyodide ou dos testes.

---

## 7. Python Runner

Local:

    src/engine/pythonRunner/

Responsabilidade:

- carregar Pyodide;

- manter uma instância reutilizável;

- executar código;

- capturar stdout;

- capturar exceptions;

- executar funções do aluno;

- transmitir entradas;

- recuperar resultados.

A aplicação deve evitar recarregar o runtime Python em cada execução.

O carregamento do Pyodide deverá ser assíncrono e seu estado deverá ser apresentado corretamente na interface.

Possíveis estados:

    idle

    loading

    ready

    running

    error

A implementação deve evitar bloquear a interface sempre que razoavelmente possível.

Código com loop infinito é um risco em execução no navegador. Se a primeira implementação não possuir mecanismo robusto de timeout ou Worker, essa limitação deve permanecer isolada no runner e ser documentada.

---

## 8. Dependências Python

NumPy e Pandas não precisam ser carregados em todos os exercícios.

Quando possível, carregar bibliotecas adicionais apenas quando o exercício precisar delas.

Um exercício poderá futuramente declarar dependências Python.

Exemplo conceitual:

    packages: \["numpy"]

ou:

    packages: \["pandas"]

A implementação concreta poderá escolher outra representação.

---

## 9. Test Runner

Local:

    src/engine/testRunner/

Responsabilidade:

- receber código executado;

- executar diferentes casos de teste;

- comparar resultado esperado e recebido;

- produzir resultados estruturados.

Não deve possuir responsabilidade visual.

O sistema deverá suportar múltiplos testes por exercício.

---

## 10. Testes públicos e internos

Existem conceitualmente dois tipos de teste:

### Públicos

Podem revelar entrada e saída ao usuário.

### Internos

São utilizados para verificar edge cases sem revelar todos os detalhes da avaliação.

Como a V1 é totalmente frontend, testes enviados ao navegador não são realmente secretos do ponto de vista de segurança.

Portanto, "teste interno" significa:

**não mostrado pela interface normal do Magnolia**

e não:

**inacessível tecnicamente ao usuário**

Caso no futuro seja necessário proteger realmente os testes, a avaliação deverá migrar para backend.

---

## 11. Evaluator

Local:

    src/engine/evaluator/

Responsabilidade:

- interpretar resultados do test runner;

- organizar feedback;

- diferenciar erro de execução de resposta incorreta;

- informar progresso da tentativa.

Não deve entregar imediatamente a solução correta.

O evaluator deverá produzir dados que a interface possa apresentar de diferentes formas.

---

## 12. Progresso

Local:

    src/progress/

Persistência inicial:

    localStorage

A implementação de armazenamento deve ser encapsulada.

Componentes React não devem acessar diretamente diferentes chaves de localStorage espalhadas pelo projeto.

Uma camada de persistência deverá centralizar leitura e escrita.

Sugestão de chave versionada:

    magnolia.progress.v1

Versionar o formato facilita futuras migrações.

---

## 13. Fluxo de uma tentativa

Fluxo conceitual:

    usuário abre exercício

            ↓

    starterCode é carregado

            ↓

    usuário altera código

            ↓

    usuário executa

            ↓

    pythonRunner executa Python

            ↓

    testRunner executa casos

            ↓

    evaluator interpreta resultados

            ↓

    interface apresenta feedback

            ↓

    progress registra tentativa

            ↓

    exercício pode ser marcado como concluído

---

## 14. Estado

Na V1, preferir estado local, hooks e Context quando necessário.

Não introduzir biblioteca global de estado sem necessidade concreta.

A aplicação pode ser reavaliada caso sua complexidade cresça significativamente.

---

## 15. Navegação

O Magnolia terá múltiplas experiências:

- dashboard;

- trilhas;

- aulas;

- exercícios;

- progresso.

A implementação poderá utilizar uma solução de roteamento apropriada quando necessário.

A navegação deve permitir URLs identificáveis para conteúdos importantes, especialmente exercícios.

---

## 16. Testes automatizados

Vitest será utilizado.

Prioridade de cobertura:

1\. testRunner;

2\. evaluator;

3\. progress;

4\. transformação ou validação de conteúdo;

5\. utilitários importantes.

Testes de interface deverão focar comportamentos relevantes, não detalhes de implementação.

---

## 17. Tratamento de erros

A aplicação deverá diferenciar:

- erro ao carregar Pyodide;

- erro de sintaxe Python;

- erro de runtime;

- resultado incorreto;

- estrutura de exercício inválida;

- erro de persistência.

Falhas do código do aluno não podem derrubar a aplicação React.

---

## 18. Performance

Cuidados principais:

- não inicializar Pyodide repetidamente;

- carregar dependências Python somente quando necessário;

- evitar renders desnecessários;

- evitar carregar todo o conteúdo pesado sem necessidade;

- manter editor e runtime independentes.

Otimizações só devem ser introduzidas quando houver benefício observável.

---

## 19. Extensibilidade

O núcleo não deve assumir que todo exercício futuro será Python.

No futuro poderão existir engines diferentes, como:

    PythonExercise

    SQLExercise

    StatisticsExercise

A V1, entretanto, deve implementar apenas o necessário para Python.

Não construir infraestrutura genérica excessiva antes dessa necessidade existir.

---

## 20. Limites da V1

A V1 não possui:

- backend;

- login;

- banco de dados;

- sincronização entre dispositivos;

- proteção real de testes internos;

- execução Python em servidor;

- tutor com IA.

Esses itens poderão ser avaliados posteriormente.

---

## 21. Critério arquitetural principal

Adicionar uma nova aula ou exercício não deve exigir modificar várias camadas da aplicação.

Idealmente:

    conteúdo novo

        ↓

    aparece automaticamente na plataforma

        ↓

    usa componentes e engines existentes

Esse é um dos principais critérios para avaliar a qualidade da arquitetura.

