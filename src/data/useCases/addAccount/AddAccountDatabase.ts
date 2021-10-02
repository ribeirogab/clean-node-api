import {
  IAddAccount,
  IEncrypter,
  IAddAccountModel,
  IAccountModel,
  IAddAccountRepository,
} from './addAccountDatabase.interfaces';

export class AddAccountDatabase implements IAddAccount {
  constructor(
    private readonly encrypter: IEncrypter,
    private readonly addAccountRepository: IAddAccountRepository,
  ) {}

  public async add({
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
