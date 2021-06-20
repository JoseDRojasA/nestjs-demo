module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.API_DB_HOST || 'localhost',
  port: parseInt(process.env.API_DB_PORT || 5432),
  username: process.env.API_DB_USERNAME || 'root',
  password: process.env.API_DB_PASSWORD || 'root',
  database: process.env.API_DB_DATABASE || 'inventory',
  entities: ['libs/database/src/entities/*.ts'],
  synchronize: false,
  migrations: ['libs/database/src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  cli: {
    migrationsDir: 'libs/database/src/migrations',
  },
};
