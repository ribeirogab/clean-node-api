import { EmailValidatorAdapter } from './EmailValidatorAdapter';

describe('Email Validator Adapter', () => {
  it('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();

    const isValid = sut.isValid('invalid_email@mail.com');

    expect(isValid).toBe(false);
  });
});
