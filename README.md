# Pre-requirements
- node v14.16.1
- yarn 1.22.4
- ts-node v10.0.0
- Docker 20.10.6

# Documentation

You can access to swagger documentation in the url: http://localhost:3000/api/

You can access to the docker image in the url: https://hub.docker.com/repository/docker/josedrojasa/nestjs-demo

You can check the infrastructure architecture [here](docs/infrastructure-architecture.md)

# Concepts
- **App**: Application. [More information](https://docs.nestjs.com/cli/monorepo#monorepo-mode)
- **Library**: Code that can be shared between multiple apps. [More information](https://docs.nestjs.com/cli/libraries)
- **Module**: Code encapsulated. [More information](https://docs.nestjs.com/modules#modules)
- **Controller**: Layer responsible for handling incoming requests and returning responses to the client. [More information](https://docs.nestjs.com/controllers)
- **Service**: Layer with all bussiness logic. [More information](https://docs.nestjs.com/providers#services)
- **DTO**: (Data Transfer Object) Abstraction of the bodies sent to the API. [More information](https://docs.nestjs.com/techniques/validation#auto-validation)
- **Repository**: Layer that access to the database. [More information](https://docs.nestjs.com/techniques/database#repository-pattern)
- **Entity**: Class that maps to a database table [More information](https://github.com/typeorm/typeorm/blob/master/docs/entities.md)
- **Migration**: File that describes how the database change. [More information](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md)
- **Factory**: Class that creates records of an entity in the database. [More information](https://github.com/w3tecch/typeorm-seeding#-using-entity-factory)

# Setup
1. Pull the repository
2. Configure the database container running: `docker-compose up -d`
3. Execute database migrations running `yarn migrate`
4. Start the project `yarn start`

# Scripts
## Start project
`yarn start`
## Create migration
`yarn typeorm migration:create -n <name>`
## Run tests
`yarn test:e2e`
