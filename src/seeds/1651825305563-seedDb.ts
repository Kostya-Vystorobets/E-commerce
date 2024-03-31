import { MigrationInterface, QueryRunner } from "typeorm";

export class seedDb31651825305563 implements MigrationInterface {
  name = "seedDb31651825305563";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (id, "userName", password, created_at, updated_at) VALUES (1, 'Admin', '$2b$10$Pif.cxSciBjIb0O/LAaKI.tp1NxRnpUfLdCjnpprlOcK/FzLZTgi.', now(), now());`
    );
  }

  public async down(): Promise<void> {}
}
