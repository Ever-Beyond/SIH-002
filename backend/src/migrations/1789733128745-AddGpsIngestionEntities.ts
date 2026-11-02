import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGpsIngestionEntities1789733128745 implements MigrationInterface {
    name = 'AddGpsIngestionEntities1789733128745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gps_records" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "vehicleId" uuid NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "location" geometry(Point,4326) NOT NULL, "speed" double precision NOT NULL, "heading" double precision NOT NULL, "timestamp" TIMESTAMP NOT NULL, "isStale" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_75197b5c6881d4d40107921118f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb5944c90fde8e5c3e4be24f83" ON "gps_records"  ("vehicleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_acf587d4308c0ad9c70470849b" ON "gps_records" USING gist ("location") `);
        await queryRunner.query(`CREATE INDEX "IDX_781d7cb354f79b0d68963e6da6" ON "gps_records"  ("timestamp") `);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "heading" double precision`);
        await queryRunner.query(`ALTER TABLE "gps_records" ADD CONSTRAINT "FK_cb5944c90fde8e5c3e4be24f83a" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gps_records" DROP CONSTRAINT "FK_cb5944c90fde8e5c3e4be24f83a"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "heading"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_781d7cb354f79b0d68963e6da6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_acf587d4308c0ad9c70470849b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb5944c90fde8e5c3e4be24f83"`);
        await queryRunner.query(`DROP TABLE "gps_records"`);
    }

}
