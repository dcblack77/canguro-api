import { 
  BaseEntity,
  Column, 
  DeleteDateColumn, 
  Entity, 
  Generated, 
  PrimaryGeneratedColumn,
  UpdateDateColumn 
} from "typeorm";
import { UserResponse } from "../interfaces/user-response.interface";
import { Roles } from "src/shared/emuns/roles.enum";


@Entity('users')
export class User extends BaseEntity implements UserResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  // TODO: Inicio de variables a validar con exactitud (OCR, EMAIL, SMS)
  @Column({ unique: true })
  dni: string;

  @Column({ unique: true })
  email: string;
  
  @Column({unique: true})
  phone: number;
  // Fin de variables a validar con mas exactitud

  @Column()
  password: string;
  
  @Column({default: false})
  checked: boolean;

  @Column({ unique: true})
  @Generated('uuid')
  verifyToken: string;
  
  @Column( { type: 'enum', enum: Roles, default: Roles.USER} )
  role: number;
  
  @Column({ type: 'date' })
  bornDate: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  static findAllMapped() {
    return this.find({
      select: {
        name: true,
        lastName: true,
        email: true,
        phone: true
      }
    });
  }
}
