export interface IUser {
  email: string;
  password: string;
  password_check: string;
}

export interface IErrorData {
  details: string;
}
export interface IErrorResponse {
  data: IErrorData;
  status: number;
  statusText: string;
}
export interface IError {
  response: IErrorResponse;
}
export interface IData {
  message: string;
  token: string;
}
export interface IResponse {
  data: IData;
  status: number;
  statusText: string;
}
