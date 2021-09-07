export class SignUpController {
  public async handle(httpRequest: any): Promise<any> {
    console.log(httpRequest);
    return {
      statusCode: 400,
      body: new Error('Missing param: name'),
    };
  }
}
