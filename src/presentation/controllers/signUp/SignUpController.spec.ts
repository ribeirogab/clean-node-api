// eslint-disable-next-line max-classes-per-file
import {
  InvalidParamError,
  MissingParamError,
  ServerError,
} from '../../errors';

import {
  IEmailValidator,
  IAddAccount,
  IAddAccountModel,
  IAccountModel,
} from './signUp.protocols';
import { SignUpController } from './SignUpController';

interface ISutTypes {
  sut: SignUpController;
  emailValidatorStub: IEmailValidator;
  addAccountStub: IAddAccount;
}

function makeEmailValidator(): IEmailValidator {
  class EmailValidatorStub implements IEmailValidator {
    public validate(_email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
}

function makeAddAccount(): IAddAccount {
  class AddAccountStub implements IAddAccount {
    public add(_account: IAddAccountModel): IAccountModel {
      const fakeAccount = {
        id: 'valid-id',
        name: 'valid-name',
        email: 'valid-email@email.com',
        password: 'valid-password',
      };

      return fakeAccount;
    }
  }

  return new AddAccountStub();
}

function makeSut(): ISutTypes {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const sut = new SignUpController(emailValidatorStub, addAccountStub);

  return { sut, emailValidatorStub, addAccountStub };
}

describe('SignUp Controller', () => {
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

  it('should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();

    const addSpy = jest.spyOn(addAccountStub, 'add');

    const payload = {
      name: 'Any Name',
      email: 'any_email@email.com',
      password: 'any-password',
    };

    const httpRequest = {
      body: {
        ...payload,
        passwordConfirmation: 'any-password',
      },
    };

    await sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith(payload);
  });

  it('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();

    const validData = {
      name: 'valid-name',
      email: 'valid-email@email.com',
      password: 'valid-password',
      passwordConfirmation: 'valid-password',
    };

    const httpRequest = {
      body: validData,
    };

    const httpResponse = await sut.handle(httpRequest);

    delete validData.passwordConfirmation;

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({ id: 'valid-id', ...validData });
  });

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

  it('should return 400 if passwordConfirmation fails', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'Any Name',
        email: 'any_email@email.com',
        password: 'any-password',
        passwordConfirmation: 'invalid-password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError('passwordConfirmation'),
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

  it('should return 500 EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, 'validate').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        name: 'Any Name',
        email: 'invalid-email',
        password: 'any-password',
        passwordConfirmation: 'any-password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it('should return 500 AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut();

    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        name: 'Any Name',
        email: 'invalid-email',
        password: 'any-password',
        passwordConfirmation: 'any-password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
