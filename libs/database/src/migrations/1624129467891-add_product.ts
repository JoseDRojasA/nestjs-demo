import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const PRODUCT_TABLE_NAME = 'product';

export class addProduct1624129467891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const productTable = new Table({
      name: PRODUCT_TABLE_NAME,
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'amount',
          type: 'int',
          default: '0',
        },
        {
          name: 'created_at',
          type: 'timestamp without time zone',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp without time zone',
          default: 'now()',
        },
      ],
    });
    await queryRunner.createTable(productTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(PRODUCT_TABLE_NAME);
  }
}
