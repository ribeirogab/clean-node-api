import { IAccountModel } from '../../domain/models/IAccount';
import { IAddAccountModel } from '../../domain/useCases/IAddAccount';

export interface IAddAccountRepository {
  execute(account: IAddAccountModel): Promise<IAccountModel>;
}
