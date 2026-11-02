import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWeatherRecordEntity1789732042065 implements MigrationInterface {
    name = 'AddWeatherRecordEntity1789732042065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."weather_records_datatype_enum" AS ENUM('OBSERVED', 'FORECAST')`);
        await queryRunner.query(`CREATE TYPE "public"."weather_records_severity_enum" AS ENUM('NORMAL', 'WARNING', 'SEVERE', 'CRITICAL')`);
        await queryRunner.query(`CREATE TABLE "weather_records" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "locationId" uuid NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "timestamp" TIMESTAMP NOT NULL, "fetchedAt" TIMESTAMP NOT NULL, "isStale" boolean NOT NULL DEFAULT false, "dataType" "public"."weather_records_datatype_enum" NOT NULL, "source" character varying NOT NULL, "temperature" double precision, "humidity" double precision, "precipitation" double precision, "rainfallIntensity" double precision, "windSpeed" double precision, "windDirection" double precision, "visibility" double precision, "condition" character varying, "severity" "public"."weather_records_severity_enum" NOT NULL DEFAULT 'NORMAL', "precipitationProbability" double precision, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b16fc9005eac35331d6dc3a2cef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9e8a12fb254c301b9597d7087c" ON "weather_records"  ("timestamp") `);
        await queryRunner.query(`ALTER TABLE "weather_records" ADD CONSTRAINT "FK_17a48e8e994fdbe59e4cba2aef2" FOREIGN KEY ("locationId") REFERENCES "weather_locations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weather_records" DROP CONSTRAINT "FK_17a48e8e994fdbe59e4cba2aef2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9e8a12fb254c301b9597d7087c"`);
        await queryRunner.query(`DROP TABLE "weather_records"`);
        await queryRunner.query(`DROP TYPE "public"."weather_records_severity_enum"`);
        await queryRunner.query(`DROP TYPE "public"."weather_records_datatype_enum"`);
    }

}
