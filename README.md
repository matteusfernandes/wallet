# Repositório do projeto Trybe Wallet!
#### :rocket: Bloco 15 - Gerenciamento de estado com Redux.

- Projeto proposto para o desenvolvimento de uma carteira de controle de gastos com conversor de moedas. Essa aplicação permite ao usuário adicionar, remover e editar um gasto, além de proporcionar a visualização de uma tabelas com todos os seus gastos e a visualização do total de gastos convertidos para uma moeda de escolha;
---

## Habilidades Desenvolvidas
- Criar um store Redux em aplicações React
- Criar reducers no Redux em aplicações React
- Criar actions no Redux em aplicações React
- Criar dispatchers no Redux em aplicações React
- Conectar Redux aos componentes React
- Criar actions assíncronas na sua aplicação React que faz uso de Redux.
---

## Instruções

1. Clone o repositório
- `git clone git@github.com:matteusfernandes/wallet.git`
- Entre na pasta do repositório que você acabou de clonar:
    - `cd project-wallet`

2. Instale as dependências e inicialize o projeto
- Instale as dependências:
    - `npm install`
- Inicialize o projeto:
    - `npm start` (uma nova página deve abrir no seu navegador)
---

## Desenvolvimento do Projeto
Nesse projeto foi desenvolvida uma aplicação em React que usa Redux como ferramenta de manipulação de estado e consome os dados da API do awesomeapi API de Cotações para realizar a busca de câmbio de moedas: `https://economia.awesomeapi.com.br/json/all`.

Através dessa aplicação, é possível realizar as operações básicas de criação e manipulação de um estado de redux.

![image](https://user-images.githubusercontent.com/83843532/188511181-fcf19923-35a6-4834-acaf-047c6d81f395.png)
![image](https://user-images.githubusercontent.com/83843532/188511237-c06ea2fc-71b1-4719-aabf-f6e773f60f56.png)

## Linter
Para garantir a qualidade e legibilidade do código, foi utilizado neste projeto os linters ESLint e StyleLint. Assim o código estará alinhado com as boas práticas de desenvolvimento, sendo mais legível e de fácil manutenção! Para rodá-los localmente no projeto, execute os comandos abaixo:

```
npm run lint

npm run lint:styles
```
---
#### Para visualizar o **Pull Request** original aberto no repositório da Trybe e tomar nota da avaliação e dos testes, acesse: [Trybe Wallet](https://github.com/tryber/sd-013-b-project-trybewallet/pull/12)
#### 💻 **Desenvolvido por** [@matteusfernandes](https://github.com/matteusfernandes) • 2022 🔗 [LinkedIn](https://www.linkedin.com/in/matteusfernandes/)

