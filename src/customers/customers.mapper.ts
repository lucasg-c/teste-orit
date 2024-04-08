import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomerDto } from './dto/customer.dto';

export class CustomersMapper {
  toEntity(customer: CreateCustomerDto): Customer {
    return new Customer(
      customer.name,
      customer.email,
      customer.birthdate,
      customer.cpf,
    );
  }

  toModel(savedCustomer: any): CustomerDto {
    return <CustomerDto>{
      id: savedCustomer.id,
      name: savedCustomer.name,
      email: savedCustomer.email,
      birthdate: savedCustomer.birthdate,
      phone: savedCustomer.phone,
      cpf: savedCustomer.cpf,
    };
  }
}
