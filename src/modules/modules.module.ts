import { Module } from '@nestjs/common';
import { ReservesModule } from './reserves/reserves.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ReservesModule,
    UsersModule
  ],
  exports: [
    ReservesModule,
    UsersModule
  ],
  
})
export class ModulesModule {}
