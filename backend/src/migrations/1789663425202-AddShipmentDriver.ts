import { MigrationInterface, QueryRunner } from "typeorm";

export class AddShipmentDriver1789663425202 implements MigrationInterface {
    name = 'AddShipmentDriver1789663425202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments" ADD "assignedDriverId" uuid`);
        await queryRunner.query(`ALTER TABLE "shipments" ADD CONSTRAINT "FK_b66150f4ce86fc89cd1d5373f86" FOREIGN KEY ("assignedDriverId") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments" DROP CONSTRAINT "FK_b66150f4ce86fc89cd1d5373f86"`);
        await queryRunner.query(`ALTER TABLE "shipments" DROP COLUMN "assignedDriverId"`);
    }

}
