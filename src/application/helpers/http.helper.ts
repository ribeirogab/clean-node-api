import { IHttpResponse } from '@application/contracts';
import { ServerError } from '@application/errors';

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});

export const ok = (data: unknown): IHttpResponse => ({
  statusCode: 200,
  body: data,
});
