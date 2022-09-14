export enum ErrorTypes {
  FewCharacters = 'FewCharacters',
  InvalidId = 'InvalidId',
}

type ErrorResponseObject = {
  error: string,
  httpStatus: number,
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {
  FewCharacters: {
    error: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  InvalidId: {
    error: 'Object not found',
    httpStatus: 404,
  },
};