import { v4 } from 'uuid';

export class Customer {
  private _id?: string;
  private _name: string;
  private _email: string;
  private _birthdate: Date;
  private _cpf: string;

  constructor(
    name: string,
    email: string,
    birthdate: Date,
    cpf: string,
    id?: string,
  ) {
    this._id = id ?? v4();
    this._name = name;
    this._email = email;
    this._birthdate = birthdate;
    this._cpf = cpf;
  }
}
