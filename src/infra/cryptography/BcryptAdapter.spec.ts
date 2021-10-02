import bcrypt from 'bcrypt';

import { BcryptAdapter } from './BcryptAdapter';

function makeSut() {
  return new BcryptAdapter();
}

describe('Bcrypt Adapter', () => {
  it('should call bcrypt with correct values', async () => {
    const sut = makeSut();

    const hashSpy = jest.spyOn(bcrypt, 'hash');

    await sut.encrypt('any-value');

    expect(hashSpy).toHaveBeenCalledWith('any-value', expect.anything());
  });
});
