import { IController } from '../protocols/controller';
import { IHttpRequest, IHttpResponse } from '../protocols/http';

import { MissingParamError } from '../errors/MissingParamError';

import { badRequest } from '../helpers/http.helper';

export class SignUpController implements IController {
  private readonly expectedBodyParams = [
    'name',
    'email',
    'password',
    'passwordConfirmation',
  ];

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const paramsProvided = Object.keys(httpRequest.body);
    const paramsNotProvided = [...this.expectedBodyParams].filter(
      param => !paramsProvided.includes(param),
    );

    return badRequest(new MissingParamError(paramsNotProvided));
  }
}
