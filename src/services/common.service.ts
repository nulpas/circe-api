import { ApiError, Payload, Request } from '../types/generic.types';
import CustomError from '../custom.error';
import { matchedData, validationResult } from 'express-validator';
import { IncomingHttpHeaders } from 'http';

class CommonService {
  public static get instance(): CommonService {
    return this._instance || (this._instance = new this());
  }

  private static _instance: CommonService;

  constructor() {}

  public getTokenFromHeaders(headers: IncomingHttpHeaders): string {
    const header: string = headers.authorization as string;
    return (header) ? header.split(' ')[1] : header;
  }

  public getPayload(request: Request): Payload {
    const _output: Payload = {
      payload: null,
      errors: null
    };
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      _output.errors = this.formatError(errors.array() as Array<ApiError>) as Array<ApiError>;
    }
    _output.payload = matchedData(request);
    return _output;
  }

  public formatError(error: Array<ApiError> | CustomError | Error): ApiError | Array<ApiError> {
    if (Array.isArray(error)) {
      return error.map((e: ApiError) => ({ ...e, code: 422 }));
    }
    return {
      code: (error as CustomError).code ? (error as CustomError).code : 0,
      location: (error as CustomError).location ? (error as CustomError).location : '',
      msg:  error.message,
      param: (error as CustomError).param ? (error as CustomError).param : '',
      value: (error as CustomError).value ? (error as CustomError).value : ''
    };
  }
}

export default CommonService.instance;
