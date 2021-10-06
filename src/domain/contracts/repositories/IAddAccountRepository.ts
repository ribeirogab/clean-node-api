import { IAccountModel } from '@domain/entities/IAccount';
import { IAddAccountModel } from '@domain/useCases/IAddAccount';

export interface IAddAccountRepository {
  execute(account: IAddAccountModel): Promise<IAccountModel>;
}
