import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTrainsTable1698857231433 implements MigrationInterface {
  name = 'CreateTrainsTable1698857231433';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."trains_type_enum" AS ENUM('passenger', 'high_speed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "trains" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" "public"."trains_type_enum" NOT NULL, "capacity" integer NOT NULL, CONSTRAINT "UQ_fb2dab72567ddaeaf35eaf80e18" UNIQUE ("name"), CONSTRAINT "PK_e4a77c477e29608e7d17d17fb4f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "trains"`);
    await queryRunner.query(`DROP TYPE "public"."trains_type_enum"`);
  }
}
