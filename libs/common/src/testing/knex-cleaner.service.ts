import * as knexCleaner from 'knex-cleaner';
import Knex from 'knex';
import { Configuration } from '../configuration';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KnexCleanerService {
  knexInstance;

  constructor() {
    const { host, port, username, password, database } = Configuration.api.db;
    this.knexInstance = Knex({
      client: 'postgres',
      connection: {
        host,
        user: username,
        password,
        database,
        port,
      },
    });
  }

  async cleanDB() {
    await knexCleaner.clean(this.knexInstance);
  }

  async closeKnex() {
    await this.knexInstance.destroy();
  }
}
