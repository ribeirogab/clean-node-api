export class SignUpController {
  public async handle(httpRequest: any): Promise<any> {
    console.log(httpRequest);
    return {
      statusCode: 400,
    };
  }
}
