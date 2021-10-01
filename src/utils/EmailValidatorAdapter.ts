import validator from 'validator';

import { IEmailValidator } from '../presentation/interfaces/IEmailValidator';

export class EmailValidatorAdapter implements IEmailValidator {
  public isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
