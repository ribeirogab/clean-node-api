import {
  IAddAccount,
  IEncrypter,
  IAddAccountModel,
  IAccountModel,
} from './addAccountDatabase.interfaces';

export class AddAccountDatabase implements IAddAccount {
  constructor(private readonly encrypter: IEncrypter) {}

  public async add(account: IAddAccountModel): Promise<IAccountModel> {
    await this.encrypter.encrypt(account.password);

    return null;
  }
}
