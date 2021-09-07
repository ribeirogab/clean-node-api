export class MissingParamError extends Error {
  constructor(params: string | string[]) {
    const moreThanOneParam = Array.isArray(params) && params.length > 1;

    const message = `Missing param${moreThanOneParam ? 's' : ''}: ${
      moreThanOneParam ? params.join(', ') : params
    }`;

    super(message);
    this.name = 'MissingParamError';
  }
}
