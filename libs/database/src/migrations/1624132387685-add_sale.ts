import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const SALE_TABLE_NAME = 'sale';

export class addSale1624132387685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const purchaseTable = new Table({
      name: SALE_TABLE_NAME,
      columns: [
        {
          name: 'id',
          type: 'int',
          isGenerated: true,
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'product_id',
          type: 'varchar',
          isNullable: false,
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
    await queryRunner.createTable(purchaseTable, true);

    const foreignKey = new TableForeignKey({
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'product',
      onDelete: 'RESTRICT',
    });

    await queryRunner.createForeignKey(SALE_TABLE_NAME, foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(SALE_TABLE_NAME);
  }
}
