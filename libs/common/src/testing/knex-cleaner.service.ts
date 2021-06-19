import * as knexCleaner from 'knex-cleaner';
import Knex from 'knex';
import { Configuration } from '../configuration';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KnexCleanerService {
  async cleanDB() {
    const { host, port, username, password, database } = Configuration.api.db;
    const knexInstance = Knex({
      client: 'postgres',
      connection: {
        host,
        user: username,
        password,
        database,
        port,
      },
    });
    await knexCleaner.clean(knexInstance);
    await knexInstance.destroy();
  }
}
