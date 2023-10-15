export interface ErrorModel {
   httpCode?: number;
   messages?: string | string[] | any,
   description?: string,
}