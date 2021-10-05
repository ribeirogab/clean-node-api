import { IAccountModel } from '../../entities/IAccount';
import { IAddAccountModel } from '../../useCases/IAddAccount';

export interface IAddAccountRepository {
  execute(account: IAddAccountModel): Promise<IAccountModel>;
}
