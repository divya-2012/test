export class HttpError extends Error {
  statusCode: number;
  errors?: Record<string, any>[];

  constructor(statusCode: number, message: string, errors?: Record<string, any>[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad Request', errors?: Record<string, any>[]) {
    super(400, message, errors);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized', errors?: Record<string, any>[]) {
    super(401, message, errors);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden', errors?: Record<string, any>[]) {
    super(403, message, errors);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found', errors?: Record<string, any>[]) {
    super(404, message, errors);
  }
}

export class ConflictError extends HttpError {
  constructor(message = 'Conflict', errors?: Record<string, any>[]) {
    super(409, message, errors);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = 'Internal Server Error', errors?: Record<string, any>[]) {
    super(500, message, errors);
  }
}
