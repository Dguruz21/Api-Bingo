import { BusinessError } from '../../../application/common/BusinessError.js';
import { ErrorEntity } from '../../entities/ErrorEntity.js';
import { LAMBDA_DOES_NOT_EXIST_ERROR } from '../ErrorConstant.js';

export class LambdaDoesNotExist extends BusinessError {
	constructor(props: ErrorEntity) {
		super(props);
		this.name = 'LambdaDoesNotExist';
	}

	static launch() {
		const { code, httpCode, description } = LAMBDA_DOES_NOT_EXIST_ERROR;

		throw new LambdaDoesNotExist({
			code,
			httpCode,
			messages: description,
		});
	}
}
