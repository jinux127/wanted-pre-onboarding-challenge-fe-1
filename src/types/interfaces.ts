export interface IUser {
  email: string;
  password: string;
  password_check: string;
}
export interface ITodos {
  title: string;
  content: string;
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
export interface ILoginResponse {
  data: IData;
  status: number;
  statusText: string;
}

export interface ITodoData {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITodoResponseData {
  data: ITodoData;
}

export interface ITodoResponse {
  data: ITodoResponseData;
  status: number;
  statusText: string;
}
export interface ITodosDatas {
  data: ITodoData[];
}
export interface ITodosResponse {
  data: ITodosDatas;
  status: number;
  statusText: string;
}
