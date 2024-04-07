import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomersMapper } from './customers.mapper';
import { DbModule } from '../db/db.module';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, CustomersMapper],
  imports: [DbModule],
})
export class CustomersModule {}
