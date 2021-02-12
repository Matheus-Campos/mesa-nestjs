<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição

Boilerplate para criação de API's usando [Nest](https://github.com/nestjs/nest).

Esse boilerplate ainda está imcompleto, com apenas algumas funcionalidades implementadas:

1.  Suporte a docker
2.  Suporte a variáveis de ambiente
3.  Conexão com banco de dados via TypeORM
3.  Suporte a migrations via TypeORM
4.  Testes unitários de services
5.  Validação de parâmetros recebidos nos endpoints

Algumas funcionalidades essenciais ainda estão faltando, como:

1.  [Autenticação](https://docs.nestjs.com/security/authentication#authentication)
2.  [Autorização](https://docs.nestjs.com/security/authorization)
3.  Testes unitários de controllers
4.  Testes e2e
5.  Cors

Funcionalidades interessantes de ter:

1.  [Documentação de endpoints](https://docs.nestjs.com/openapi/introduction)
2.  [Serviço de fila](https://docs.nestjs.com/techniques/queues)


## Prós e contras

Esses são os prós e contras que EU (Matheus Campos) identifiquei na tentativa de construir um boilerplate usando nestjs.

Prós de usar nestjs:

1.  Usa Typescript, sendo assim conseguimos aplicar os princípios SOLID.
2.  É um framework bem modular, deixando o dev à vontade para usar as dependências que quiser, desde test runners até ORMs, pode-se inclusive trocar o core dele, tirando o express e colocando o fastify que é mais performático;
3.  Possui uma CLI bem completa, que gera arquivos de entity, controller, service e seus respectivos arquivos de teste;
4. Usa arquitetura baseada em módulos, deixando as responsabilidades mais separadas.
4.  Assim como o Adonisjs, possui um container IoC e um sistema de DI, que otimiza a importação e uso das classes.

Contras de usar nestjs:

1.  O tempo de boot é maior, já que ele precisa mapear os módulos e instanciar as classes para começar a funcionar;
2.  A curva de aprendizado é maior, por conta da arquitetura em módulos e do container IoC, além do Typescript;
3.  Ao contrário de Rails e Adonisjs, precisa ser configurado quase do 0, já que não vem com ORM, serviço de configuração para variáveis de ambiente e etc.

## Instalação

```bash
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

ou

```bash
$ docker-compose up -d
```

## Testando

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Lidando com as migrations

Como o nestjs é bem modular, ele não tem ORM próprio e o desenvolvedor deve instalar e configurar o ORM desejado, que nesse caso foi o TypeORM, já que ele tem uma interface similar ao do próprio nestjs, trabalhando com decorators também.

Para criar uma migration: `$ ./node_modules/typeorm/cli.js migration:create -n exemplo`
Para gerar uma migration a partir de mudanças feitas diretamente no banco: `$ ./node_modules/typeorm/cli.js migration:generate -n exemplo`

Essas migrations vão ser criadas no diretório `migrations` na raíz do projeto.

Para executar as migrations: `$ npm run typeorm migration:run`

É necessário usar esse comando porque como as migrations são escritas em Typescript e o TypeORM só entende migrations em Javascript (sabe-se lá o porquê), essas migrations precisam ser transpiladas primeiro, e no script "typeorm" no package.json, usamos o ts-node para fazer esse trabalho.

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
