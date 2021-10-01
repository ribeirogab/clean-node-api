import { IEmailValidator } from '../presentation/interfaces/IEmailValidator';

export class EmailValidatorAdapter implements IEmailValidator {
  public isValid(_email: string): boolean {
    return false;
  }
}
