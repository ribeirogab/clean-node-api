export class InvalidParamError extends Error {
  constructor(params: string | string[]) {
    const moreThanOneParam = Array.isArray(params) && params.length > 1;

    const message = `Invalid param${moreThanOneParam ? 's' : ''}: ${
      moreThanOneParam ? params.join(', ') : params
    }`;

    super(message);
    this.name = 'InvalidParamError';
  }
}
