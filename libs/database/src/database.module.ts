import { CommonModule, Configuration } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    }),
  ],
})
export class DatabaseModule {}
