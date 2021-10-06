import { IHttpRequest, IHttpResponse } from '@application/contracts/IHttp';

export interface IController {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
