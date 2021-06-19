import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const PURCHASE_TABLE_NAME = 'purchase';

export class addPurchase1624131817140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const purchaseTable = new Table({
      name: PURCHASE_TABLE_NAME,
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

    await queryRunner.createForeignKey(PURCHASE_TABLE_NAME, foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(PURCHASE_TABLE_NAME);
  }
}
