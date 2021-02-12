import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class User1612785056118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'int',
          unsigned: true,
          isGenerated: true,
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'phone',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'password',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'deleted_at',
          type: 'timestamp',
        },
      ],
    });

    await queryRunner.createTable(users);

    await queryRunner.createIndex(
      users,
      new TableIndex({
        columnNames: ['phone'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const users = await queryRunner.getTable('users');

    await queryRunner.dropTable(users);
  }
}
