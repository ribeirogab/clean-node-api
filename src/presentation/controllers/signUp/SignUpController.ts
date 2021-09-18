import { InvalidParamError } from '../../errors/InvalidParamError';
import { MissingParamError } from '../../errors/MissingParamError';

import { badRequest, serverError } from '../../helpers/http.helper';

import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IEmailValidator,
  IAddAccount,
} from './signUp.protocols';

export class SignUpController implements IController {
  private readonly expectedBodyParams = [
    'name',
    'email',
    'password',
    'passwordConfirmation',
  ];

  constructor(
    private readonly emailValidator: IEmailValidator,
    private addAccount: IAddAccount,
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

      const emailIsValid = this.emailValidator.validate(email);

      if (!emailIsValid) {
        return badRequest(new InvalidParamError('email'));
      }

      this.addAccount.add({ name, email, password });

      return {
        statusCode: 200,
        body: {},
      };
    } catch (error) {
      return serverError();
    }
  }
}
