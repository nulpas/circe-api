export default class CustomError extends Error {
  public param: string;
  public value: string | number | boolean;
  public location: string;
  public code: number;

  constructor(...args) {
    super(args[0]);

    this.code = (args[1]) ? args[1] : undefined;
    this.param = (args[2]) ? args[2] : undefined;
    this.value = (args[3]) ? args[3] : undefined;
    this.location = (args[4]) ? args[4] : undefined;
  }
}
