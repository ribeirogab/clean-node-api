import { IAccountModel } from '../../../domain/models/IAccount';
import {
  IAddAccount,
  IAddAccountModel,
} from '../../../domain/useCases/IAddAccount';
import { IEncrypter } from '../../interfaces/IEncrypter';

export class AddAccountDatabase implements IAddAccount {
  constructor(private readonly encrypter: IEncrypter) {}

  public async add(account: IAddAccountModel): Promise<IAccountModel> {
    await this.encrypter.encrypt(account.password);

    return null;
  }
}
