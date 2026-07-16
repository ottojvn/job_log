# Job Tracker

Rastreio de candidaturas a vagas de emprego, para facilitar o controle de processos seletivos

## Funcionalidades

- Cadastro de vagas e candidaturas
- Status por etapa
- Busca e filtro
- Dashboard simples

## Stack

- React
- TypeScript
- Node.js
- PostgreSQL

## Estrutura:

- **frontend/:** Projeto Next.js
- **api/:** Projeto Express
- **infra/** TODO: infraestrutura AWS

## Como executar

1. **Instale as dependências:**
    ```bash
    npm install --prefix ./api && npm install --prefix ./frontend

    ```
2. **Configure o .env**
3. **Rode o backend**
    ```bash
    cd api/
    npm start

    ```
4. **Rode o frontend**
    ```bash
    cd frontend/
    npm start

    ```

## Variáveis de ambiente

- DATABASE_URL=
- JWT_SECRET=
