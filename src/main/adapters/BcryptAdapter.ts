import { hash } from 'bcrypt';

import { IEncrypter } from '@application/contracts/IEncrypter';

export class BcryptAdapter implements IEncrypter {
  private readonly saltOrRounds = 12;

  public async encrypt(value: string): Promise<string> {
    const hashedValue = await hash(value, this.saltOrRounds);
    return hashedValue;
  }
}
