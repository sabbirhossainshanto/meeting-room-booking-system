/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { TErrorMessages } from '../interface/error';
import config from '../config';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: TErrorMessages = [
    {
      message: 'Something went wrong',
      path: '',
    },
  ];

  if (error instanceof ZodError) {
    const zodError = handleZodError(error);
    statusCode = zodError.statusCode;
    message = zodError.message;
    errorMessages = zodError.errorMessages;
  } else if (error?.name === 'ValidationError') {
    const validationErr = handleValidationError(error);
    statusCode = validationErr.statusCode;
    message = validationErr.message;
    errorMessages = validationErr.errorMessages;
  } else if (error?.name === 'CastError') {
    const validationErr = handleCastError(error);
    statusCode = validationErr.statusCode;
    message = validationErr.message;
    errorMessages = validationErr.errorMessages;
  } else if (error?.code === 11000) {
    const validationErr = handleDuplicateError(error);
    statusCode = validationErr.statusCode;
    message = validationErr.message;
    errorMessages = validationErr.errorMessages;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = [
      {
        path: '',
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = [
      {
        path: '',
        message: error.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    error,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
