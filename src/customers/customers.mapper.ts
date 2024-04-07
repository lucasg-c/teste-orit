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

  toModel(savedCustomer: any): Customer {
    return new Customer(
      savedCustomer.id,
      savedCustomer.name,
      savedCustomer.email,
      savedCustomer.birthdate,
      savedCustomer.phone,
      savedCustomer.cpf,
    );
  }
}
