import { MigrationInterface, QueryRunner } from "typeorm";
export declare class TestMigration1760838735337 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
