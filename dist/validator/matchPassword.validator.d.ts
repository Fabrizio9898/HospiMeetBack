import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class MatchPassword implements ValidatorConstraintInterface {
    validate(password: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
