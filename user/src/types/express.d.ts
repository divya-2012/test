import 'express';

declare global {
  namespace Express {
    interface Request {
      validated?: any;
    }
  }
}
