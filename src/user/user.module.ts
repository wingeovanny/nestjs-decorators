import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ErrorHandlerService } from './error-handler.services';

@Module({
  controllers: [UserController],
  providers: [UserService, Logger, ErrorHandlerService],
})
export class UserModule {}
