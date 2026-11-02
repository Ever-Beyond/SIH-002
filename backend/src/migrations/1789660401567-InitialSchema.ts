import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1789660401567 implements MigrationInterface {
    name = 'InitialSchema1789660401567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "districts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "boundary" geometry(Polygon,4326) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6a6fd6d258022e5576afbad90b4" UNIQUE ("name"), CONSTRAINT "PK_972a72ff4e3bea5c7f43a2b98af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6fb9c21c7d2c0282fad4ab3ac2" ON "districts" USING gist ("boundary") `);
        await queryRunner.query(`CREATE TABLE "roads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" character varying NOT NULL, "path" geometry(LineString,4326) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_73b4b3e031879f4cb68fb6984cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7ad4bf66ee637f7d74367743a7" ON "roads" USING gist ("path") `);
        await queryRunner.query(`CREATE TYPE "public"."drivers_status_enum" AS ENUM('AVAILABLE', 'ON_DUTY', 'OFF_DUTY', 'SUSPENDED')`);
        await queryRunner.query(`CREATE TABLE "drivers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "licenseNumber" character varying NOT NULL, "status" "public"."drivers_status_enum" NOT NULL DEFAULT 'AVAILABLE', "contactNumber" character varying NOT NULL, "assignedVehicleId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_754b3d50a8cc64f7ad5c24f62b4" UNIQUE ("licenseNumber"), CONSTRAINT "PK_92ab3fb69e566d3eb0cae896047" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dae9223023a6734f8763c7cf16" ON "drivers"  ("status") `);
        await queryRunner.query(`CREATE TABLE "routes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "path" geometry(LineString,4326) NOT NULL, "shipmentId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_76100511cdfa1d013c859f01d8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6991954a7bed07733ce954bb89" ON "routes" USING gist ("path") `);
        await queryRunner.query(`CREATE TYPE "public"."incidents_type_enum" AS ENUM('ROADBLOCK', 'WEATHER', 'ACCIDENT', 'INFRASTRUCTURE')`);
        await queryRunner.query(`CREATE TYPE "public"."incidents_severity_enum" AS ENUM('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')`);
        await queryRunner.query(`CREATE TYPE "public"."incidents_status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED')`);
        await queryRunner.query(`CREATE TABLE "incidents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."incidents_type_enum" NOT NULL, "severity" "public"."incidents_severity_enum" NOT NULL, "district" character varying NOT NULL, "status" "public"."incidents_status_enum" NOT NULL DEFAULT 'OPEN', "timestamp" TIMESTAMP NOT NULL, "affectedRoads" text, "affectedVehicles" text, "description" text, "location" geometry(Point,4326), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ccb34c01719889017e2246469f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4d0b572cc18218fc59653a4b63" ON "incidents"  ("type") `);
        await queryRunner.query(`CREATE INDEX "IDX_ec3823825f8b286b2e1da93496" ON "incidents"  ("severity") `);
        await queryRunner.query(`CREATE INDEX "IDX_befe1eac88b06df68d370f1f00" ON "incidents"  ("district") `);
        await queryRunner.query(`CREATE INDEX "IDX_6fa7e61c79777de95b6a4ecd63" ON "incidents"  ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_c566d3b2ca76f043a2da59359a" ON "incidents" USING gist ("location") `);
        await queryRunner.query(`CREATE TYPE "public"."vehicles_status_enum" AS ENUM('ACTIVE', 'IDLE', 'OFFLINE', 'MAINTENANCE')`);
        await queryRunner.query(`CREATE TYPE "public"."vehicles_currentrisklevel_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH')`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "plateNumber" character varying NOT NULL, "type" character varying NOT NULL, "status" "public"."vehicles_status_enum" NOT NULL DEFAULT 'IDLE', "currentRiskLevel" "public"."vehicles_currentrisklevel_enum" NOT NULL DEFAULT 'LOW', "speedKmH" double precision NOT NULL DEFAULT '0', "batteryOrFuelLevel" double precision NOT NULL DEFAULT '100', "lastPing" TIMESTAMP, "location" geometry(Point,4326), "driverId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_66ea96381a7a7ceb35c72f36625" UNIQUE ("plateNumber"), CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_66ea96381a7a7ceb35c72f3662" ON "vehicles"  ("plateNumber") `);
        await queryRunner.query(`CREATE INDEX "IDX_198957f5c5a1fa53aeaf2a0838" ON "vehicles"  ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_e0698e6e7b17c64b13bc2a5b80" ON "vehicles" USING gist ("location") `);
        await queryRunner.query(`CREATE TYPE "public"."shipments_commoditytype_enum" AS ENUM('GENERAL', 'HAZARDOUS', 'PERISHABLE', 'FRAGILE', 'SECURE')`);
        await queryRunner.query(`CREATE TYPE "public"."shipments_status_enum" AS ENUM('PENDING', 'IN_TRANSIT', 'DELIVERED', 'DELAYED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TYPE "public"."shipments_priority_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')`);
        await queryRunner.query(`CREATE TABLE "shipments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "origin" character varying NOT NULL, "destination" character varying NOT NULL, "commodityType" "public"."shipments_commoditytype_enum" NOT NULL DEFAULT 'GENERAL', "weightKg" double precision NOT NULL DEFAULT '0', "status" "public"."shipments_status_enum" NOT NULL DEFAULT 'PENDING', "priority" "public"."shipments_priority_enum" NOT NULL DEFAULT 'MEDIUM', "eta" TIMESTAMP, "assignedVehicleId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6deda4532ac542a93eab214b564" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6a19baf6dd62cac42fbb40a518" ON "shipments"  ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_738803c19cc2d8297d64195f66" ON "shipments"  ("priority") `);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('SUPER_ADMIN', 'ADMIN', 'OFFICER', 'FIELD_OFFICER', 'DRIVER', 'VIEWER')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'OFFICER', "refreshTokenHash" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weather_locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "location" geometry(Point,4326) NOT NULL, "currentConditions" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_379320ce469ec7c04e7d4f1286a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_064cc0540041a3c269f8c3e9df" ON "weather_locations" USING gist ("location") `);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_28d7607488252336b22511e9e80" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipments" ADD CONSTRAINT "FK_a2726542fdfba3712a77eb1735f" FOREIGN KEY ("assignedVehicleId") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments" DROP CONSTRAINT "FK_a2726542fdfba3712a77eb1735f"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_28d7607488252336b22511e9e80"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_064cc0540041a3c269f8c3e9df"`);
        await queryRunner.query(`DROP TABLE "weather_locations"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_738803c19cc2d8297d64195f66"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a19baf6dd62cac42fbb40a518"`);
        await queryRunner.query(`DROP TABLE "shipments"`);
        await queryRunner.query(`DROP TYPE "public"."shipments_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."shipments_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."shipments_commoditytype_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e0698e6e7b17c64b13bc2a5b80"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_198957f5c5a1fa53aeaf2a0838"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_66ea96381a7a7ceb35c72f3662"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TYPE "public"."vehicles_currentrisklevel_enum"`);
        await queryRunner.query(`DROP TYPE "public"."vehicles_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c566d3b2ca76f043a2da59359a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6fa7e61c79777de95b6a4ecd63"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_befe1eac88b06df68d370f1f00"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ec3823825f8b286b2e1da93496"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4d0b572cc18218fc59653a4b63"`);
        await queryRunner.query(`DROP TABLE "incidents"`);
        await queryRunner.query(`DROP TYPE "public"."incidents_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."incidents_severity_enum"`);
        await queryRunner.query(`DROP TYPE "public"."incidents_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6991954a7bed07733ce954bb89"`);
        await queryRunner.query(`DROP TABLE "routes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dae9223023a6734f8763c7cf16"`);
        await queryRunner.query(`DROP TABLE "drivers"`);
        await queryRunner.query(`DROP TYPE "public"."drivers_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7ad4bf66ee637f7d74367743a7"`);
        await queryRunner.query(`DROP TABLE "roads"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6fb9c21c7d2c0282fad4ab3ac2"`);
        await queryRunner.query(`DROP TABLE "districts"`);
    }

}
