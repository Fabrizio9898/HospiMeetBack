import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateTables1761338238700 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
