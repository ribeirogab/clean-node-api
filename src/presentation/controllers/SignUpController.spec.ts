import { MissingParamError } from '../errors/MissingParamError';

import { SignUpController } from './SignUpController';

const makeSut = (): SignUpController => new SignUpController();

describe('SignUp Controller', () => {
  it('should return 400 if no name is provided', async () => {
    const sut = makeSut();
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
    const sut = makeSut();
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
    const sut = makeSut();
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
    const sut = makeSut();
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
    const sut = makeSut();
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
});
