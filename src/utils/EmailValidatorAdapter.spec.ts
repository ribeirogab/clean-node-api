import validator from 'validator';

import { EmailValidatorAdapter } from './EmailValidatorAdapter';

jest.mock('validator', () => ({
  isEmail: (): boolean => {
    return true;
  },
}));

describe('Email Validator Adapter', () => {
  it('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);

    const isValid = sut.isValid('invalid-email@mail.com');

    expect(isValid).toBe(false);
  });

  it('should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter();

    const isValid = sut.isValid('valid-email@mail.com');

    expect(isValid).toBe(true);
  });
});
