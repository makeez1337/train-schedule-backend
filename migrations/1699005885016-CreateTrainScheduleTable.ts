import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTrainScheduleTable1699005885016
  implements MigrationInterface
{
  name = 'CreateTrainScheduleTable1699005885016';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "train_schedule" ("id" SERIAL NOT NULL, "arrive_time" TIMESTAMP WITH TIME ZONE NOT NULL, "departure_time" TIMESTAMP WITH TIME ZONE NOT NULL, "train_id" integer, "station_from_id" integer, "station_to_id" integer, CONSTRAINT "PK_65e5f98d23dfdc1ca27a58fb264" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedule" ADD CONSTRAINT "FK_644e9a1edb1cde4294e7b5a4691" FOREIGN KEY ("train_id") REFERENCES "trains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedule" ADD CONSTRAINT "FK_5b81e89e3a9de89eccf4843dda1" FOREIGN KEY ("station_from_id") REFERENCES "stations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedule" ADD CONSTRAINT "FK_5e20f38702de1c8ab36eef9e15b" FOREIGN KEY ("station_to_id") REFERENCES "stations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "train_schedule" DROP CONSTRAINT "FK_5e20f38702de1c8ab36eef9e15b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedule" DROP CONSTRAINT "FK_5b81e89e3a9de89eccf4843dda1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "train_schedule" DROP CONSTRAINT "FK_644e9a1edb1cde4294e7b5a4691"`,
    );
    await queryRunner.query(`DROP TABLE "train_schedule"`);
  }
}
