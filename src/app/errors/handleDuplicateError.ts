/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorMessages, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractValue = match && match[0];
  const errorMessages: TErrorMessages = [
    {
      path: Object.keys(err.keyValue)[0],
      message: `${extractValue} is already exist`,
    },
  ];
  return {
    errorMessages,
    message: 'Validation error',
    statusCode: 400,
  };
};

export default handleDuplicateError;
