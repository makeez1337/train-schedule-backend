import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStationsTable1698858108052 implements MigrationInterface {
  name = 'CreateStationsTable1698858108052';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "stations" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "city" character varying NOT NULL, CONSTRAINT "UQ_998a2ff0191749951c74b9ba890" UNIQUE ("name"), CONSTRAINT "PK_f047974bd453c85b08bab349367" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "stations"`);
  }
}
