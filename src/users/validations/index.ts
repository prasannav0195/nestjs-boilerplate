import {
    IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString
} from 'class-validator';

export default class UserDto {
    @IsNumber()
        id: number;
    @IsString()
        name: string;
    @IsArray()
        roles: string[];
    @IsBoolean()
        isActive: boolean;
    @IsEmail()
        email: string;
    @IsNotEmpty()
        password: string;
}
