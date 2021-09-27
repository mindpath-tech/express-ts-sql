export class CustomErrorHandler extends Error {
  code = 'CUSTOM_ERROR';
  status = 500;

  constructor(status: number, message: string, code: string) {
    super(message);
    this.code = code;
    this.status = status;
  }
}
