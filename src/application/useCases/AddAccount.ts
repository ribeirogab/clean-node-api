import { IAddAccountRepository } from '../../domain/contracts/repositories/IAddAccountRepository';
import { IAccountModel } from '../../domain/entities/IAccount';
import {
  IAddAccount,
  IAddAccountModel,
} from '../../domain/useCases/IAddAccount';
import { IEncrypter } from '../contracts/IEncrypter';

export class AddAccount implements IAddAccount {
  constructor(
    private readonly encrypter: IEncrypter,
    private readonly addAccountRepository: IAddAccountRepository,
  ) {}

  public async execute({
    email,
    name,
    password,
  }: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.encrypter.encrypt(password);

    const account = await this.addAccountRepository.execute({
      email,
      name,
      password: hashedPassword,
    });

    return account;
  }
}
