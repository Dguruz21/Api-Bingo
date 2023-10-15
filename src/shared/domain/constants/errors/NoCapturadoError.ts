import { BusinessError } from '../../../application/common/BusinessError.js';
import { ErrorEntity } from '../../entities/ErrorEntity.js';
import { NO_CAPTURADO_ERROR } from '../ErrorConstant.js';

export class NoCapturadoError extends BusinessError {
	constructor(props: ErrorEntity) {
		super(props);
		this.name = 'NoCapturadoError';
	}

	static launch() {
		const { code, httpCode, description } = NO_CAPTURADO_ERROR;

		throw new NoCapturadoError({
			code,
			httpCode,
			messages: description,
		});
	}
}
