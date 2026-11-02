import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRoadEntities1789717174357 implements MigrationInterface {
    name = 'UpdateRoadEntities1789717174357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."road_segments_status_enum" AS ENUM('OPEN', 'CLOSED', 'PARTIALLY_CLOSED', 'UNDER_MAINTENANCE')`);
        await queryRunner.query(`CREATE TYPE "public"."road_segments_accessibilitystatus_enum" AS ENUM('ALL_VEHICLES', 'HIGH_CLEARANCE_ONLY', 'HEAVY_RESTRICTED', 'EMERGENCY_ONLY')`);
        await queryRunner.query(`CREATE TABLE "road_segments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roadId" uuid NOT NULL, "startDistanceKm" double precision NOT NULL, "endDistanceKm" double precision NOT NULL, "status" "public"."road_segments_status_enum" NOT NULL DEFAULT 'OPEN', "accessibilityStatus" "public"."road_segments_accessibilitystatus_enum" NOT NULL DEFAULT 'ALL_VEHICLES', "segmentPath" geometry(LineString,4326) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_32eb82f0761f8c1b20aee0b9d5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e9eab847f18f441939c7506ebc" ON "road_segments" USING gist ("segmentPath") `);
        await queryRunner.query(`CREATE TYPE "public"."roads_status_enum" AS ENUM('OPEN', 'CLOSED', 'PARTIALLY_CLOSED', 'UNDER_MAINTENANCE')`);
        await queryRunner.query(`ALTER TABLE "roads" ADD "status" "public"."roads_status_enum" NOT NULL DEFAULT 'OPEN'`);
        await queryRunner.query(`CREATE TYPE "public"."roads_accessibilitystatus_enum" AS ENUM('ALL_VEHICLES', 'HIGH_CLEARANCE_ONLY', 'HEAVY_RESTRICTED', 'EMERGENCY_ONLY')`);
        await queryRunner.query(`ALTER TABLE "roads" ADD "accessibilityStatus" "public"."roads_accessibilitystatus_enum" NOT NULL DEFAULT 'ALL_VEHICLES'`);
        await queryRunner.query(`ALTER TABLE "road_segments" ADD CONSTRAINT "FK_3a7424538c7c30416ce93548b2a" FOREIGN KEY ("roadId") REFERENCES "roads"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "road_segments" DROP CONSTRAINT "FK_3a7424538c7c30416ce93548b2a"`);
        await queryRunner.query(`ALTER TABLE "roads" DROP COLUMN "accessibilityStatus"`);
        await queryRunner.query(`DROP TYPE "public"."roads_accessibilitystatus_enum"`);
        await queryRunner.query(`ALTER TABLE "roads" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."roads_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e9eab847f18f441939c7506ebc"`);
        await queryRunner.query(`DROP TABLE "road_segments"`);
        await queryRunner.query(`DROP TYPE "public"."road_segments_accessibilitystatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."road_segments_status_enum"`);
    }

}
