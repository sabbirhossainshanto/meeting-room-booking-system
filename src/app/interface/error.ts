export type TErrorMessages = {
  message: string;
  path: string | number;
}[];

export type TGenericErrorResponse = {
  errorMessages: TErrorMessages;
  message: string;
  statusCode: number;
};
