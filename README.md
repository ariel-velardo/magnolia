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

Cada exercício poderá oferecer:

- explicação do problema;
- exemplos;
- código inicial;
- editor de código;
- execução Python no navegador;
- testes automáticos;
- feedback de erros;
- dicas;
- acompanhamento de progresso.

O objetivo não é apenas informar se a resposta está certa ou errada, mas ajudar o aluno a entender o erro e tentar novamente.

## Stack

A stack inicial é:

- React
- TypeScript
- Vite
- ESLint
- Tailwind CSS
- Monaco Editor
- Pyodide
- localStorage
- Vitest

Python será executado localmente no navegador através do Pyodide.

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

## Executando localmente

Instale as dependências:

    npm install

Inicie o ambiente de desenvolvimento:

    npm run dev

Valide o projeto:

    npm run lint
    npm run build

Quando os testes automatizados estiverem configurados:

    npm test

## Status

O Magnolia está em desenvolvimento inicial.

A prioridade atual é construir uma primeira versão funcional com:

- interface de aprendizado;
- editor de código;
- execução Python;
- avaliação automática;
- conteúdo inicial;
- progresso local.

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