import {
    IsEmail, IsNotEmpty, IsString
} from 'class-validator';

export default class UserDto {
    @IsString()
        name: string;
    @IsEmail()
        email: string;
    @IsNotEmpty()
        phone: number;
}
