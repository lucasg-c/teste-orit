import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomersMapper } from './customers.mapper';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, CustomersMapper],
})
export class CustomersModule {}
