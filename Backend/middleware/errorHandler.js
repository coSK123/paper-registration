
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  

  const statusCode = err.statusCode || 500;
  

  const errorResponse = {
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.stack,
    path: req.path
  };
  

  if (err.errors) {
    errorResponse.validationErrors = err.errors;
  }
  

  res.status(statusCode).json(errorResponse);
};


export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
  
  static badRequest(message) {
    return new ApiError(message || 'Bad Request', 400);
  }
  
  static unauthorized(message) {
    return new ApiError(message || 'Unauthorized', 401);
  }
  
  static forbidden(message) {
    return new ApiError(message || 'Forbidden', 403);
  }
  
  static notFound(message) {
    return new ApiError(message || 'Resource Not Found', 404);
  }
  
  static internalError(message) {
    return new ApiError(message || 'Internal Server Error', 500);
  }
} 