import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateDoctor1760888589060 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
