import { mongodbHelper } from '@infrastructure/databases/mongodb/helpers/mongodb.helper';
import { AccountMongoDBRepository } from '@infrastructure/databases/mongodb/repositories/AccountMongoDBRepository';

function makeSut() {
  return new AccountMongoDBRepository();
}

describe('Account Repository', () => {
  beforeAll(async () => {
    await mongodbHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await mongodbHelper.disconnect();
  });

  it('should return an account on success', async () => {
    const sut = makeSut();

    const accountData = {
      name: 'any-name',
      email: 'any-email@mail.com',
      password: 'any-password',
    };

    const account = await sut.execute(accountData);

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe(accountData.name);
    expect(account.email).toBe(accountData.email);
    expect(account.password).toBe(accountData.password);
  });
});
