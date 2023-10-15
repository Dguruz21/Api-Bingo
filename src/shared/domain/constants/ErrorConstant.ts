import { ErrorEntity } from "../entities/ErrorEntity";
import { ServiceStatusEnum } from "../enumerations/ServiceStatusEnum";

export const NO_CAPTURADO_ERROR: ErrorEntity = {
	code: 'ERR-CID-NO-APTURADO',
	httpCode: ServiceStatusEnum.InternalError,
	description: 'Ha ocurrido un error inesperado.',
};

export const LAMBDA_ERROR: ErrorEntity = {
	code: 'ERR-CID-CONSUMIR-LAMBDA',
	httpCode: ServiceStatusEnum.InternalError,
	description: 'Error al consumir lambda.',
};

export const LAMBDA_DOES_NOT_EXIST_ERROR: ErrorEntity = {
	code: 'ERR-CID-LAMBDA-NO-FUE-IMPLEMENTADA',
	httpCode: ServiceStatusEnum.InternalError,
	description: 'El lambda no fue registrado.',
};
