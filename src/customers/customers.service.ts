import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersMapper } from './customers.mapper';
import { PrismaService } from '../db/prisma.service';
import { CustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    private customersMapper: CustomersMapper,
    private prismaService: PrismaService,
  ) {}
  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    const customer = this.customersMapper.toEntity(createCustomerDto);

    const cpfAlreadyExists = this.prismaService.customers.findUnique({
      where: { cpf: customer.cpf },
    });

    if (cpfAlreadyExists) {
      console.log(`CPF of number ${customer.cpf} already exists`);
      throw new ConflictException(`Invalid CPF or email`);
    }

    const emailAlreadyExists = this.prismaService.customers.findUnique({
      where: { email: customer.email },
    });

    if (emailAlreadyExists) {
      console.log(`Email ${customer.email} already exists`);
      throw new ConflictException(`Invalid CPF or email`);
    }

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

  async findAll() {
    const customers = await this.prismaService.customers.findMany({});

    return customers.map((c) => this.customersMapper.toModel(c));
  }

  async findOne(id: string) {
    const customerById = await this.prismaService.customers.findUnique({
      where: { id },
    });

    if (!customerById) {
      throw new NotFoundException(`Customer of id=${id} does not exist.`);
    }

    return this.customersMapper.toModel(customerById);
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
