export class SignUpController {
  private readonly expectedBodyParams = [
    'name',
    'email',
    'password',
    'passwordConfirmation',
  ];

  public async handle(httpRequest: any): Promise<any> {
    const paramsProvided = Object.keys(httpRequest.body);
    const paramsNotProvided = [...this.expectedBodyParams].filter(
      param => !paramsProvided.includes(param),
    );

    return {
      statusCode: 400,
      body: new Error(`Missing param: ${paramsNotProvided.join(', ')}`),
    };
  }
}
