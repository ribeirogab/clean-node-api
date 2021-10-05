import { InvalidParamError, MissingParamError } from '../errors';

import { badRequest, serverError, ok } from '../helpers/http.helper';

import { IAddAccount } from '../../domain/useCases/IAddAccount';
import {
  IController,
  IEmailValidator,
  IHttpRequest,
  IHttpResponse,
} from '../contracts';

export class SignUpController implements IController {
  private readonly expectedBodyParams = [
    'name',
    'email',
    'password',
    'passwordConfirmation',
  ];

  constructor(
    private readonly emailValidator: IEmailValidator,
    private readonly addAccount: IAddAccount,
  ) {}

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const paramsProvided = Object.keys(httpRequest.body);
      const paramsNotProvided = [...this.expectedBodyParams].filter(
        param => !paramsProvided.includes(param),
      );

      if (paramsNotProvided.length !== 0) {
        return badRequest(new MissingParamError(paramsNotProvided));
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValidEmail = this.emailValidator.isValid(email);

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'));
      }

      const account = await this.addAccount.execute({ name, email, password });

      return ok(account);
    } catch (error) {
      return serverError();
    }
  }
}
