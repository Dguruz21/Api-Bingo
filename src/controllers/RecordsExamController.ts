import { inject, injectable } from 'tsyringe';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { IRecordsExamService } from '../application/interfaces/IRecordsExamService';
import { ResponseUtil } from '../../../../shared/application/utils/ResponseUtil';
import { CidPayload } from '../../../../shared/domain/payloads/CidPayload';
import { RequestUtil } from '../../../../shared/application/utils/RequestUtil';
import { Validate } from '../../../../shared/application/utils/validateRequest';
import { RecordsExamPayload, RecordsExamSchema } from '../domain/payloads/RecordsExamPayload';

@injectable()
export class RecordsExamController {

    constructor(
        @inject('IRecordsExamService') private readonly recordsExamService: IRecordsExamService) {
    }

    public async execute (event: APIGatewayProxyEvent | CidPayload<RecordsExamPayload>): Promise<APIGatewayProxyResult> {
        const { request }: CidPayload<RecordsExamPayload> = RequestUtil.getBodyCid(event);

        Validate.validateRequest(request.payload, RecordsExamSchema);

        const response = await this.recordsExamService.records({ request });

        return ResponseUtil.response(response);
    }
}