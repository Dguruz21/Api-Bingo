import { ErrorModel } from "../models/ErrorModel";
import { ServiceStatusEnum } from "../enumerations/ServiceStatusEnum";

export const NOT_CAPTURED_ERROR: ErrorModel = {
   httpCode: ServiceStatusEnum.InternalError,
   description: 'Ha ocurrido un error inesperado.',
};
