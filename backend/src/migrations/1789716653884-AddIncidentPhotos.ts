import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIncidentPhotos1789716653884 implements MigrationInterface {
    name = 'AddIncidentPhotos1789716653884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incidents" ADD "photos" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incidents" DROP COLUMN "photos"`);
    }

}
