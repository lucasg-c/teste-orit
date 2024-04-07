import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

export class CustomersMapper {
  toEntity(customer: CreateCustomerDto): Customer {
    return new Customer(
      customer.name,
      customer.email,
      customer.birthdate,
      customer.cpf,
    );
  }
}
