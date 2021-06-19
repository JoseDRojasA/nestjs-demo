export const Configuration = {
  api: {
    db: {
      host: process.env.API_DB_HOST,
      port: parseInt(process.env.API_DB_PORT),
      username: process.env.API_DB_USERNAME,
      password: process.env.API_DB_PASSWORD,
      database: process.env.API_DB_DATABASE,
    },
  },
};
