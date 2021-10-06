import { IAddAccountRepository } from '@domain/contracts/repositories';
import { IAccountModel } from '@domain/entities/IAccount';
import { IAddAccountModel } from '@domain/useCases/IAddAccount';

import { mongodbHelper } from '@infrastructure/databases/mongodb/helpers/mongodb.helper';

export class AccountMongoDBRepository implements IAddAccountRepository {
  public async execute(accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = mongodbHelper.getCollection('accounts');

    await accountCollection.insertOne(accountData);

    return null as IAccountModel;
  }
}
