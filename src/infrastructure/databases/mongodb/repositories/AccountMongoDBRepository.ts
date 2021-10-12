import { IAddAccountRepository } from '@domain/contracts/repositories';
import { IAccountModel } from '@domain/entities/IAccount';
import { IAddAccountModel } from '@domain/useCases/IAddAccount';

import { mongodbHelper } from '@infrastructure/databases/mongodb/helpers/mongodb.helper';

export class AccountMongoDBRepository implements IAddAccountRepository {
  public async execute(accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = mongodbHelper.getCollection('accounts');

    const { insertedId } = await accountCollection.insertOne(accountData);

    const { _id, ...accountWithoutId } = await accountCollection.findOne<
      Omit<IAccountModel, 'id'> & { _id: string }
    >({
      _id: insertedId,
    });

    const account = { id: _id, ...accountWithoutId };

    return account;
  }
}
