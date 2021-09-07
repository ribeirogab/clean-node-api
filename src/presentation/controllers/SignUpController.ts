import { IController } from '../protocols/controller';
import { IEmailValidator } from '../protocols/emailValidator';
import { IHttpRequest, IHttpResponse } from '../protocols/http';

import { InvalidParamError } from '../errors/InvalidParamError';
import { MissingParamError } from '../errors/MissingParamError';

import { badRequest } from '../helpers/http.helper';

export class SignUpController implements IController {
  private readonly expectedBodyParams = [
    'name',
    'email',
    'password',
    'passwordConfirmation',
  ];

  constructor(private readonly emailValidator: IEmailValidator) {}

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const paramsProvided = Object.keys(httpRequest.body);
    const paramsNotProvided = [...this.expectedBodyParams].filter(
      param => !paramsProvided.includes(param),
    );

    if (paramsNotProvided.length !== 0) {
      return badRequest(new MissingParamError(paramsNotProvided));
    }

    const { email } = httpRequest.body;
    const emailIsValid = this.emailValidator.validate(email);

    if (!emailIsValid) {
      return badRequest(new InvalidParamError('email'));
    }

    return {
      statusCode: 200,
      body: {},
    };
  }
}
