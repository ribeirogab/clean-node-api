import { AddAccountDatabase } from './AddAccountDatabase';
import {
  IEncrypter,
  IAccountModel,
  IAddAccountModel,
  IAddAccountRepository,
} from './addAccountDatabase.interfaces';

type SutTypes = {
  sut: AddAccountDatabase;
  encrypterStub: IEncrypter;
  addAccountRepositoryStub: IAddAccountRepository;
};

function makeEncrypter() {
  class EncrypterStub implements IEncrypter {
    public async encrypt(_password: string): Promise<string> {
      return 'hashed-password';
    }
  }

  return new EncrypterStub();
}

function makeAddAccountRepository() {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    public async execute(account: IAddAccountModel): Promise<IAccountModel> {
      const fakeAccount = {
        id: 'valid-id',
        ...account,
      };
      return fakeAccount;
    }
  }

  return new AddAccountRepositoryStub();
}

function makeSut(): SutTypes {
  const encrypterStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new AddAccountDatabase(encrypterStub, addAccountRepositoryStub);

  return { sut, encrypterStub, addAccountRepositoryStub };
}

describe('Add Account Database UseCase', () => {
  it('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    const password = 'valid-password';
    const accountData = {
      name: 'valid-name',
      email: 'valid-email',
      password,
    };

    await sut.execute(accountData);

    expect(encryptSpy).toHaveBeenCalledWith(password);
  });

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();

    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockRejectedValueOnce(async () => new Error());

    const accountData = {
      name: 'valid-name',
      email: 'valid-email',
      password: 'valid-password',
    };

    expect(sut.execute(accountData)).rejects.toThrow();
  });

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'execute');

    const accountData = {
      name: 'valid-name',
      email: 'valid-email',
      password: 'valid-password',
    };

    await sut.execute(accountData);

    expect(addSpy).toHaveBeenCalledWith({
      ...accountData,
      password: 'hashed-password',
    });
  });
});
