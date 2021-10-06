import { IAddAccountRepository } from '@domain/contracts/repositories/IAddAccountRepository';
import { IAccountModel } from '@domain/entities/IAccount';
import { IAddAccountModel } from '@domain/useCases/IAddAccount';

import { IEncrypter } from '@application/contracts/IEncrypter';
import { AddAccount } from '@application/useCases/AddAccount';

type SutTypes = {
  sut: AddAccount;
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
  const sut = new AddAccount(encrypterStub, addAccountRepositoryStub);

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

    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error());

    const accountData = {
      name: 'valid-name',
      email: 'valid-email',
      password: 'valid-password',
    };

    await expect(sut.execute(accountData)).rejects.toThrow();
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

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    jest
      .spyOn(addAccountRepositoryStub, 'execute')
      .mockRejectedValueOnce(new Error());

    const accountData = {
      name: 'valid-name',
      email: 'valid-email',
      password: 'valid-password',
    };

    await expect(sut.execute(accountData)).rejects.toThrow();
  });

  it('should return an account on success', async () => {
    const { sut } = makeSut();

    const accountData = {
      name: 'valid-name',
      email: 'valid-email',
      password: 'valid-password',
    };

    const account = await sut.execute(accountData);

    expect(account).toEqual({
      id: 'valid-id',
      ...accountData,
      password: 'hashed-password',
    });
  });
});
