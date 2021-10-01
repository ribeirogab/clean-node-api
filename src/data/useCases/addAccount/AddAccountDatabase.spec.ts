import { IEncrypter } from '../../interfaces/IEncrypter';
import { AddAccountDatabase } from './AddAccountDatabase';

type SutTypes = {
  sut: AddAccountDatabase;
  encrypterStub: IEncrypter;
};

function makeEncrypter() {
  class EncrypterStub implements IEncrypter {
    public async encrypt(_password: string): Promise<string> {
      return 'hashed-password';
    }
  }

  return new EncrypterStub();
}

function makeSut(): SutTypes {
  const encrypterStub = makeEncrypter();
  const sut = new AddAccountDatabase(encrypterStub);

  return { sut, encrypterStub };
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

    await sut.add(accountData);

    expect(encryptSpy).toHaveBeenCalledWith(password);
  });
});
