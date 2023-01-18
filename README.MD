# My tasks API

![alt text](./docs/images/my-task-image.jpg)

---

## Objetivo

O objetivo da **My tasks** é anotar e listar suas tarefas, te dando controle do que já foi feito e do que ainda está pendente.

---

## Documentação

1. [Cadastro](./docs/signup.md)
2. [Login](./docs/login.md)
3. [Criar nova tarefa](./docs/create-task.md)
4. [Modificar cadastro](./docs/modify-user.md)
5. [Modificar tarefa](./docs/modify-task.md)
6. [Buscar dados do usuário](./docs/find-user.md)
7. [Buscar por tarefa específica](./docs/find-task.md)
8. [Buscar todas as tarefas do usuário](./docs/find-all-tasks.md)

## Instalando dependências

Após baixar o Repositório em seu computador use o comando `yarn install` dentro da pasta para instalar as dependencias.

Requisitos para uso:

- Ter **node** instalado na sua maquina.
- Ter o **yarn** instalado na sua maquina.
- Banco de dados **Mysql** ou **MariaDB**.
- Criar um arquivo **.env** na raiz do projeto, copiando os parametros do **.env.test** (editando de acordo com suas especificações).

Execute o comando `yarn build` para gerar uma pasta **dist** e execute `yarn start` para rodar o projeto, caso deseje rodar em modo development use o comando `yarn dev`.

## Rodando os testes

Requisitos para rodar testes:

- Todos os requisitos da sessão [Instalando dependências.](#instalando-dependências)
- Ter **Docker** e **Docker Compose** instalados na sua maquina.

Após executar o comando `yarn install` use o comando `yarn migrate:test`, agora podera usar os comandos `yarn test:unit` para rodar os testes unitários ou `yarn test:integration` para rodar os testes de integração, será gerado um arquivo **"coverage"**.
