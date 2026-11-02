import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRouteEntities1789718861628 implements MigrationInterface {
    name = 'UpdateRouteEntities1789718861628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."routes_status_enum" AS ENUM('PROPOSED', 'ACCEPTED', 'REJECTED', 'ACTIVE', 'COMPLETED')`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "status" "public"."routes_status_enum" NOT NULL DEFAULT 'PROPOSED'`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "isAlternative" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "vehicleId" uuid`);
        await queryRunner.query(`ALTER TABLE "routes" ADD CONSTRAINT "FK_5e657840dfbba582b38696696e8" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routes" DROP CONSTRAINT "FK_5e657840dfbba582b38696696e8"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "vehicleId"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "isAlternative"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."routes_status_enum"`);
    }

}
