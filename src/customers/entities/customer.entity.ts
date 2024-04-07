import { v4 } from 'uuid';

export class Customer {
  private _id?: string;
  private _name: string;
  private _email: string;
  private _birthdate: Date;
  private _phone?: string;
  private _cpf: string;

  constructor(
    name: string,
    email: string,
    birthdate: Date,
    cpf: string,
    phone?: string,
    id?: string,
  ) {
    this._id = id ?? v4();
    this._name = name;
    this._email = email;
    this._birthdate = birthdate;
    this._cpf = cpf;
    this._phone = phone;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get birthdate(): Date {
    return this._birthdate;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  set birthdate(value: Date) {
    this._birthdate = value;
  }

  get cpf(): string {
    return this._cpf;
  }

  set cpf(value: string) {
    this._cpf = value;
  }
}
