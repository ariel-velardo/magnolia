# Magnolia

**Programming • Statistics • Machine Learning**

Magnolia é uma plataforma pessoal de aprendizado e prática de programação, estatística e Data Science.

A proposta é combinar conteúdo didático com exercícios executáveis diretamente no navegador.

O fluxo principal de aprendizado é:

**Conceito → Explicação → Exemplos → Prática → Testes → Feedback → Progresso**

## Objetivo

O Magnolia nasce como uma ferramenta pessoal para:

- praticar Python;
- desenvolver lógica de programação;
- estudar Data Science de forma prática;
- revisar estatística e Machine Learning;
- acompanhar evolução por habilidade;
- preparar-se futuramente para entrevistas técnicas.

A plataforma começa com Python, mas sua arquitetura deve permitir expansão futura para SQL e outros tipos de exercício.

## Trilhas iniciais

### Programação

Conteúdos planejados incluem:

- variáveis e tipos;
- condicionais;
- loops;
- strings;
- listas;
- dicionários;
- sets;
- funções;
- comprehensions;
- tratamento de erros;
- orientação a objetos;
- algoritmos;
- resolução de problemas;
- desafios de entrevistas técnicas.

### Data Science

Conteúdos planejados incluem:

- Python para Data Science;
- NumPy;
- Pandas;
- análise exploratória;
- estatística;
- probabilidade;
- Machine Learning;
- casos aplicados.

## Experiência de exercício

Cada exercício já oferece:

- explicação do problema;
- exemplos derivados dos próprios casos de teste;
- código inicial;
- editor de código com destaque de sintaxe;
- execução Python no navegador;
- saída do programa;
- mensagens de erro do Python;
- verificação automática da solução;
- testes públicos e internos;
- feedback com esperado e recebido;
- dicas progressivas.

Duas ações diferentes, de propósito:

- **Executar** roda seu código e mostra a saída. Serve para explorar e depurar.
  Executar sem erro não significa que a solução está correta.
- **Verificar solução** roda os casos de teste e avalia a resposta.

Ainda virá:

- registro de conclusão no progresso.

O objetivo não é apenas informar se a resposta está certa ou errada, mas ajudar o aluno a entender o erro e tentar novamente.

## Stack

A stack atual é:

- React
- TypeScript
- Vite
- ESLint
- CSS próprio, sem framework de estilos
- Monaco Editor
- Pyodide
- localStorage
- Vitest

Python executa localmente no navegador através do Pyodide, dentro de um Web
Worker. Nenhum código do aluno é enviado a servidor algum.

A V1 não possui backend, banco de dados ou autenticação.

## Estrutura

    magnolia/
    ├── content/
    │   ├── programming/
    │   └── data-science/
    ├── docs/
    ├── src/
    │   ├── components/
    │   ├── engine/
    │   ├── hooks/
    │   ├── layouts/
    │   ├── pages/
    │   ├── progress/
    │   ├── types/
    │   └── utils/
    └── tests/

A arquitetura completa está documentada em:

`docs/ARCHITECTURE.md`

O roadmap está em:

`docs/ROADMAP.md`

As regras para criação de conteúdo estão em:

`docs/CONTENT_GUIDE.md`

A progressão da trilha de Programação está em:

`docs/PROGRAMMING_CURRICULUM.md`

## Executando localmente

Instale as dependências:

    npm install

Inicie o ambiente de desenvolvimento:

    npm run dev

O Dashboard fica em `/`; a partir dele, o conteúdo declarativo pode ser
percorrido pelas rotas `/tracks/:trackId`, `/lessons/:lessonId` e
`/exercises/:exerciseId`.

Valide o projeto:

    npm test
    npm run lint
    npm run build

Na primeira execução de um exercício, o navegador baixa o runtime do Pyodide
(cerca de 10 MB) da CDN oficial. Depois disso ele fica em cache e é
reaproveitado durante a sessão.

## Status

As Fases 1, 2 e 3 estão concluídas.

O Magnolia oferece um recorte declarativo e navegável com Dashboard, duas
trilhas, nove aulas e vinte e três exercícios; e a página de exercício já traz
um editor Monaco com Python executando no navegador, captura de `stdout` e
tratamento de erros do Python.

A trilha de Programação começa do zero — do primeiro `print` até funções — e
nenhum exercício exige um conceito que ainda não foi ensinado. A progressão está
documentada em `docs/PROGRAMMING_CURRICULUM.md`.

O ciclo completo funciona: o aluno escreve, executa, verifica, recebe o número
de testes aprovados e o feedback do que falhou — sem receber a solução.

A prioridade atual é a Fase 4: persistir o progresso, incluindo exercícios
concluídos. Hoje o resultado vale para a tentativa atual e não sobrevive a um
refresh.

## Evolução futura

Possibilidades futuras incluem:

- SQL;
- exercícios interativos de estatística;
- Machine Learning;
- modo entrevista;
- cronômetro;
- análise de habilidades;
- prática adaptativa;
- tutor com IA;
- contas de usuário;
- persistência em nuvem.
