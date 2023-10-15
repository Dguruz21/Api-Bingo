import { ErrorModel } from "../../domain/models/ErrorModel";

export class CardError extends Error {
   private readonly httpCode?: number;
   private readonly messages?: string | string[];

   constructor({ httpCode = undefined, messages = ['Generic Error'] }: ErrorModel) {
      super();
      Error.captureStackTrace(this, this.constructor);
      this.httpCode = httpCode;
      this.messages = messages;
   }
}