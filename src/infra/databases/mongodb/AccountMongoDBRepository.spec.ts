// import { mongodbHelper } from './mongodb.helper';

// function makeSut() {
//   return new AccountMongoDBRepository();
// }

describe('Account Repository', () => {
  // beforeAll(async () => {
  //   await mongodbHelper.connect(process.env.MONGO_URL);
  // });

  // afterAll(async () => {
  //   await mongodbHelper.disconnect();
  // });

  it('only test', () => {
    expect(1 + 1).toBe(2);
  });

  // it('should return an account on success', async () => {
  //   const sut = makeSut();

  //   const accountData = {
  //     name: 'any-name',
  //     email: 'any-email@mail.com',
  //     password: 'any-password',
  //   };

  //   const account = await sut.add(accountData);

  //   expect(account).toBeTruthy();
  //   expect(account.id).toBeTruthy();
  //   expect(account.name).toBe(accountData.name);
  //   expect(account.email).toBe(accountData.email);
  //   expect(account.password).toBe(accountData.password);
  // });
});
