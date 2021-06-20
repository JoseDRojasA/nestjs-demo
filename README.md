# Pre-requirements
- node v14.16.1
- yarn 1.22.4
- ts-node v10.0.0
- Docker 20.10.6

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