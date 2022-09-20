# Car Shop MongoDB

## Sobre o projeto:
Neste projeto, apliquei os princípios de Programação Orientada a Objetos `(POO)` para a construção de uma `API` com `CRUD` para gerenciar uma concessionária de veículos (carros e motos). Para tal, foi utilizado o banco de dados `MongoDB`. Além disso, foi utilizado a lib `zod` para validação dos dados informados no `body` das requisições. Ainda, também foram realizados `testes unitários` em todas as camadas da aplicação (`models`, `services` e `controllers`) com uma cobertura de **100%** das linhas de códigos.

## Orientações para a execução:
<details>
  <summary>
    <strong>Subir o banco do MongoDB usando Docker</strong>
  </summary><br>

  Caso não tenha o MongoDB instalado em sua máquina e deseje usar o Docker:

  1. Baixe a imagem do MongoDB:

  ```sh
  docker pull mongo
  ```

  2. Crie o contêiner do MongoDB:

  ```sh
  docker run --name <nome-do-container> -p 27017:27017 -d mongo
  ```

  3. Confira se o contêiner está rodando:

  ```sh
  docker ps
  ```

</details>

<details>
  <summary>
    <strong>Rodando no Docker vs Localmente</strong>
  </summary><br>

  ## Docker

  > Rode os serviços `node` e `mongodb` com o comando `docker-compose up -d`.
  - Será inicicializado um container chamado `car_shop` e outro chamado `car_shop_db`.
  - Pode-se rodar o container `car_shop` via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it car_shop bash`.
  - Para acessar o terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`
  
  ⚠ Atenção ⚠ Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima.

  ## Localmente

  > Instale as dependências [**Caso existam**] com `npm install`
  - Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.

</details>


