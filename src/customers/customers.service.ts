import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    const cpfAlreadyExists = await this.prismaService.customers.findUnique({
      where: { cpf: customer.cpf },
    });

    if (cpfAlreadyExists) {
      console.log({ cpfAlreadyExists });
      console.log(`CPF of number ${customer.cpf} already exists`);
      throw new ConflictException(`Invalid CPF or email`);
    }

    const emailAlreadyExists = await this.prismaService.customers.findUnique({
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

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    if (updateCustomerDto.birthdate) {
      updateCustomerDto.birthdate = new Date(updateCustomerDto.birthdate);
    }

    const updatedCustomer = await this.prismaService.customers
      .update({
        where: {
          id,
        },
        data: {
          ...updateCustomerDto,
        },
      })
      .catch((error) => {
        if (error.code == 'P2025') {
          throw new NotFoundException(`Customer of id=${id} does not exist.`);
        }

        if (error.code == 'P2002') {
          throw new ConflictException(`Invalid email or CPF.`);
        }
      });

    return this.customersMapper.toModel(updatedCustomer);
  }

  async remove(id: string) {
    const existsCustomerById = await this.prismaService.customers.findUnique({
      where: { id },
    });

    if (!existsCustomerById) {
      throw new NotFoundException(`Customer of id=${id} does not exist.`);
    }

    await this.prismaService.customers.delete({
      where: { id },
    });

    console.log(`Deleted customer of id=${id}`);
  }
}
