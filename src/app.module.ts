import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './config/config.module';
import { ModulesModule } from './modules/modules.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [ConfigurationModule, ModulesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
