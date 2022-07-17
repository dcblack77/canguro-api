import { IsNotEmpty } from "class-validator";

export class CreateUserDto {

  id;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  dni: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: number;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  bornDate: Date;

  role: number;

  checked: boolean;

  verifyToken: string;
  
}
