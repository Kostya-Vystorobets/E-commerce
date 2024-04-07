import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEntity1712496433280 implements MigrationInterface {
    name = 'UpdateEntity1712496433280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "userName"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "products" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "product_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "is_sold" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "products" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "products" ADD "sold_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "products" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "sold_at"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "is_sold"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "product_code"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "userName" character varying NOT NULL`);
    }

}
