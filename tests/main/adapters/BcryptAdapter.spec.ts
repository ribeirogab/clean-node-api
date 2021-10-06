import bcrypt from 'bcrypt';

import { BcryptAdapter } from '@main/adapters/BcryptAdapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'hash';
  },
}));

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

  it('should return a hash on success', async () => {
    const sut = makeSut();

    const hash = await sut.encrypt('any-value');

    expect(hash).toBe('hash');
  });

  it('should throws if bcrypt throws', async () => {
    const sut = makeSut();

    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error() as never);

    await expect(sut.encrypt('any-value')).rejects.toThrow();
  });
});
