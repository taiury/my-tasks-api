# My tasks API

![alt text](./docs/images/my-task-image.jpg)

---

## Objetivo

O objetivo da **My tasks** é anotar e listar suas tarefas, te dando controle do que já foi feito e do que ainda está pendente.

---

## Documentação

1. [Cadastro](./docs/signup.md)
2. [Habilitar conta](./docs/enableAccount.md)
3. [Login](./docs/login.md)
4. [Criar nova tarefa](./docs/create-task.md)
5. [Modificar cadastro](./docs/modify-user.md)
6. [Modificar tarefa](./docs/modify-task.md)
7. [Buscar dados do usuário](./docs/find-user.md)
8. [Buscar por tarefa específica](./docs/find-task.md)
9. [Buscar todas as tarefas do usuário](./docs/find-all-tasks.md)

---

## Instalando dependências

Após baixar o Repositório em seu computador use o comando `npm install` e `npm run husky:prepare` dentro da pasta para instalar as dependencias.

### Requisitos para uso:

- Ter **node** instalado na sua maquina.
- Ter **Docker** e **Docker Compose** instalados na sua maquina.
- Criar um arquivo **.env** na raiz do projeto, copiando os parametros do [**.env.exemple**](.env.exemple) (Editando-a de acordo com suas especificações).

### Usando docker:

1. Execute como administrador o comando `npm run compose:up` para subir os containers
2. Execute o comando `npm run migrate:db` para modelar o banco de dados.
3. Caso queira deletar os containers criados use como administrador `npm run compose:down`.

### Rodando projeto na sua maquina principal:

1. Execute o comando `npm run build` para gerar uma pasta **dist**.
2. Execute `npm start` para rodar o projeto.
3. Caso deseje rodar em modo development apenas use o comando `npm run dev`.

---

## Rodando os testes

### Requisitos para rodar testes:

- Todos os requisitos da sessão [Instalando dependências.](#instalando-dependências)

### Comandos:

Use `npm install` e siga os passos de [Usando docker.](#usando-docker)

- Para rodar testes:
  - Unitários use o comando `npm run test:unit`.
  - Integração use o comando `npm run test:integration`.
  - Todos os teste mais **coverage** use o comando `npm run test:ci`.
