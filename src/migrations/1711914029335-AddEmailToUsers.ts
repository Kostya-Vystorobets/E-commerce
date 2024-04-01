import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEmailToUsers1711914029335 implements MigrationInterface {
    name = 'AddEmailToUsers1711914029335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    }

}
