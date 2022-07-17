import { User } from "../entities/user.entity";

export class UserResponse {
  name: string;
  lastName: string;
  email: string;
  phone: number;
  constructor(user) {
    this.name = `${user.name}`;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phone = user.phone;
  }
}
