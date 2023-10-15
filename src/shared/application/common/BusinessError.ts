import { ErrorEntity } from "../../domain/entities/ErrorEntity";

export class BusinessError extends Error {
    private readonly code?: string;
    private readonly httpCode?: number;
    private readonly messages?: string | string[];

    constructor({ code = undefined, httpCode = undefined, messages = ['Generic Error'] }: ErrorEntity) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.code = code;
        this.httpCode = httpCode;
        this.messages = messages;
    }
}