import { BusinessError } from '../../../application/common/BusinessError.js';
import { ErrorEntity } from '../../entities/ErrorEntity.js';
import { LAMBDA_ERROR } from '../ErrorConstant.js';

export class LambdaError extends BusinessError {
	constructor(props: ErrorEntity) {
		super(props);
		this.name = 'LambdaError';
	}

	static launch(message?: string) {
		const { code, httpCode, description } = LAMBDA_ERROR;

		throw new LambdaError({
			code,
			httpCode,
			messages: message ? `${description}: ${message}` : description,
		});
	}
}
