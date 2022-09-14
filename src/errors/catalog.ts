export enum ErrorTypes {

}

type ErrorResponseObject = {
  message: string,
  httpStatus: number,
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {

};