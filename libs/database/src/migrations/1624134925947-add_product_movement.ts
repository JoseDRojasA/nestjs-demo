import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const PRODUCT_MOVEMENT_TABLE_NAME = 'product_movement';

const amountColumn = new TableColumn({
  name: 'amount',
  type: 'int',
});

export class addProductMovement1624134925947 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('purchase');
    await queryRunner.dropTable('sale');

    const purchaseTable = new Table({
      name: PRODUCT_MOVEMENT_TABLE_NAME,
      columns: [
        {
          name: 'id',
          type: 'int',
          isGenerated: true,
          isPrimary: true,
        },
        {
          name: 'amount',
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

    await queryRunner.createForeignKey(PRODUCT_MOVEMENT_TABLE_NAME, foreignKey);
    const productTable = await queryRunner.getTable('product');
    await productTable.removeColumn(amountColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_movement');
    const productTable = await queryRunner.getTable('product');
    await productTable.addColumn(amountColumn);
  }
}
