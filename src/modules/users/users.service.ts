import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Utils } from '../../shared/utils';
import { UserResponse } from './interfaces/user-response.interface'
import { ErrorsResponse } from 'src/shared/errors';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private utils: Utils,
    private errors: ErrorsResponse
  ){}

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    try {
      createUserDto.password = await this.utils.hashPassword(createUserDto.password);
      const user = await this.userRepository.save(createUserDto);

      this.utils.sendVerifyEmail(user.email, user.name, user.verifyToken);

      return new UserResponse(user);
    } catch (error) {
      console.error(error)
      if (error.code === 'ER_DUP_ENTRY') this.errors.responseError(error, "El correo, telefono o DNI ya se encuentra registrado en nuestro sistema", HttpStatus.CONFLICT);
      this.errors.responseError(error, "Ponganse en contacto con hola@canguroreal.es", HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(): Promise<User[]> {
    try {
      // TODO: Verificación de roles. ADMIN: Todos. CANGU: Solo Usuarios relacionados, USER: Canguros
      /* 
        const user = this.getUserConnected(this.request.user);
        // TODO: Manera 1
        let usersFinded: User[] = 'ADMIN' ? await this.userRepository.find() :
                      'USER' ? await this.userRepository.findBy({role: 'CANGURO'}) :
                      'CANGURO' ? await this.userRepository.findBy({role: 'USER'});
        // TODO: Manera 2
        let userFinded: User[] = [];
        if (user.role === 'USER') usersFinded = await this.userRepository.findBy({role: 'CANGURO'});
        if (user.role === 'CANGURO') usersFinded = await this.userRepository.findBy({role: 'USER'});
        if (user.role === 'ADMIN') userFinded = await this.userRepository.find();
      
      */
      const users = await User.findAllMapped();
      return users;
    } catch (error) {
      this.errors.responseError(error, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<UserResponse> {
    try {
      const user = await this.userRepository.findOneByOrFail({id});
      return new UserResponse(user);
    } catch (error) {
      this.errors.responseError(error, error.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponse> {
    try {
      const userUpdate = await this.userRepository.update(id, updateUserDto);
      return new UserResponse(userUpdate);
    } catch (error) {
      this.errors.responseError(error, error.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<any>{
    try {
      /* const userDeleted = await this.userRepository.softDelete(id);
      return new UserResponse(userDeleted); */

      return await this.userRepository.softDelete(id);
    } catch (error) {
      this.errors.responseError(error, error.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
 