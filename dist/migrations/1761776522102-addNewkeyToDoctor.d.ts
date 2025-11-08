import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddNewkeyToDoctor1761776522102 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
