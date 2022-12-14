# NG.CASH Wallet

# 🎯Objetivo

Estruturar uma aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.

# 🖥️Tecnologias utilizadas

## Front End

- Typescript
- React
- Styled Components
- Material UI
- Vite

## Back End

- Node.js
- Typescript
- Express
- Sequelize
- PostgreSQL

## Geral

- Docker e Docker Compose

# Como Utilizar

1. Clone o repositório repositório para sua máquina utilizando o comando: 
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`git clone git@github.com:julio-silveira/NG.CASH-CHALLENGE.git`

2. Após finalizar o download, crie um arquivo .env na raiz do projeto, recomendo utilizar o arquivo `.envexample` como template;

3. Mude para o diretório /app utilizando o comando `cd app/` e em seguida, execute o comando `docker compose up` para montar os 4 containers necessários para o funcionamento do projeto e aguarde eles finalizarem a montagem;

4. Com todos containers em pê, abra seu navegador na página `http://localhost:3000/` e pronto, basta utilizar a aplicação!

## Dados para acessar a aplicação

  Você pode registrar uma nova conta clicando no botão de registro e informando um novo nome de usuário uma senha com pelo menos 8 caractéres, sendo pelo menos um dele uma letra maiúscula, uma minúscula e um número.
  
  Alternativamente, voce pode acessar a aplicação utilizando uma das contas que são criadas durante a população do banco de dados:
  
  | username | password |
  |:--------:|:--------:|
  |`user01`  |`1234`    |
  |`user02`  |`4321`    |
