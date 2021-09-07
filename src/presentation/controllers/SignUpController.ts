import { MissingParamError } from '../errors/MissingParamError';
import { IHttpRequest, IHttpResponse } from '../protocols/http';

export class SignUpController {
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

    return {
      statusCode: 400,
      body: new MissingParamError(paramsNotProvided),
    };
  }
}
