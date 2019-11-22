class BaseError {
  stack?: string;

  constructor() {
    Error.apply(this, arguments);
  }
}

BaseError.prototype = new Error();

class NotFoundError extends BaseError {
  public status = 404;
  public message = "Resource not found";
  public name = "NotFoundError";

  constructor(message?: string) {
    super();
    this.message = message || this.message;
  }
}

class TeapotError extends BaseError {
  public status = 418;
  public message = "I'm a Teapot";
  public name = "TeapotError";

  constructor(message?: string) {
    super();
    if (message) {
      this.message = message;
    }
  }
}

class ValidationError extends BaseError {
  public status = 424;
  public message = "Validation error";
  public name = "ValidationError";

  constructor(message?: string) {
    super();
    if (message) {
      this.message = message;
    }
  }
}

class UnprocessableEntityError extends BaseError {
  public status = 500;
  public message = "Unprocessable entity";
  public name = "UnprocessableEntityError";

  constructor(message?: string) {
    super();
    if (message) {
      this.message = message;
    }
  }
}

class UnauthorizedError extends BaseError {
  public status = 401;
  public message = "Unauthorized";
  public name = "UnauthorizedError";

  constructor(message?: string) {
    super();
    if (message) {
      this.message = message;
    }
  }
}

class ForbiddenError extends BaseError {
  public status = 401;
  public message = "Forbidden";
  public name = "ForbiddenError";

  constructor(message?: string) {
    super();
    if (message) {
      this.message = message;
    }
  }
}

class UnknownError extends BaseError {
  public status = 520;
  public message = "Unknown error";
  public name = "UnknownError";

  constructor(message?: string) {
    super();
    if (message) {
      this.message = message;
    }
  }
}

export {
  UnknownError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  UnprocessableEntityError as InternalError,
  TeapotError,
};
