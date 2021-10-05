type Body = any; // eslint-disable-line @typescript-eslint/no-explicit-any

export interface IHttpResponse {
  statusCode: number;
  body: Body;
}

export interface IHttpRequest {
  body?: Body;
}
