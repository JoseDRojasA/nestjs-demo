import { CommonModule, Configuration } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
export * as repositories from './repositories';
const { host, port, username, password, database } = Configuration.api.db;

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      synchronize: false,
      logging: true,
      entities: [join(__dirname, 'entities', '*.ts')],
    }),
  ],
})
export class DatabaseModule {}
