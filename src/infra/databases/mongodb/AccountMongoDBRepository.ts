// import { IAddAccountRepository } from '../../../data/interfaces/IAddAccountRepository';
// import { IAccountModel } from '../../../domain/models/IAccount';
// import { IAddAccountModel } from '../../../domain/useCases/IAddAccount';
// import { mongodbHelper } from './mongodb.helper';

// export class AccountMongoDBRepository implements IAddAccountRepository {
//   public async execute(accountData: IAddAccountModel): Promise<IAccountModel> {
//     const accountCollection = mongodbHelper.getCollection('accounts');

//     const result = await accountCollection.insertOne(accountData);

//     return account;
//   }
// }
