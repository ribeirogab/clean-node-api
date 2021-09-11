import { IEmailValidator } from '../protocols/emailValidator';

import { InvalidParamError, MissingParamError } from '../errors';

import { SignUpController } from './SignUpController';

interface ISutTypes {
  sut: SignUpController;
  emailValidatorStub: IEmailValidator;
}

function makeSut(): ISutTypes {
  class EmailValidatorStub implements IEmailValidator {
    public validate(_email: string): boolean {
      return true;
    }
  }

  const emailValidatorStub = new EmailValidatorStub();
  const sut = new SignUpController(emailValidatorStub);

  return { sut, emailValidatorStub };
}

describe('SignUp Controller', () => {
  it('should return 400 if no name is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any-password',
        passwordConfirmation: 'any-password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'Any Name',
        password: 'any-password',
        passwordConfirmation: 'any-password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('should return 400 if no password is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'Any Name',
        email: 'any_email@email.com',
        passwordConfirmation: 'any-password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  it('should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'Any Name',
        email: 'any_email@email.com',
        password: 'any-password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation'),
    );
  });

  it('should return 400 if no parameter is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {},
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError([
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ]),
    );
  });

  it('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, 'validate').mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        name: 'Any Name',
        email: 'invalid-email',
        password: 'any-password',
        passwordConfirmation: 'any-password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  it('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut();

    const validateSpy = jest.spyOn(emailValidatorStub, 'validate');

    const email = 'any_email@email.com';
    const httpRequest = {
      body: {
        name: 'Any Name',
        email,
        password: 'any-password',
        passwordConfirmation: 'any-password',
      },
    };

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(email);
  });
});
