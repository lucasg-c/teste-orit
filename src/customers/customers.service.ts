import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomersMapper } from './customers.mapper';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class CustomersService {
  constructor(
    private customersMapper: CustomersMapper,
    private prismaService: PrismaService,
  ) {}
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customersMapper.toEntity(createCustomerDto);

    const savedCustomer = await this.prismaService.customers.create({
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        birthdate: new Date(customer.birthdate),
        phone: customer.phone,
        cpf: customer.cpf,
      },
    });

    return this.customersMapper.toModel(savedCustomer);
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
