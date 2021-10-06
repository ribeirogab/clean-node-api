import validator from 'validator';

import { IEmailValidator } from '@application/contracts/IEmailValidator';

export class EmailValidatorAdapter implements IEmailValidator {
  public isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
