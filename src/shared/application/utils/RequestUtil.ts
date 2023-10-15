import { APIGatewayProxyEvent } from "aws-lambda";

import { CidPayload } from "../../domain/payloads/CidPayload";

export class RequestUtil {
    static getBodyCid<T>(event: APIGatewayProxyEvent | CidPayload<T>) {
        let cid: CidPayload<T> = ("body" in event && event.body) ? JSON.parse(event.body) : event;

        return cid;
    }

    static getPayloadBodyCid<T>(event: APIGatewayProxyEvent | CidPayload<T>) {
        const { request } = RequestUtil.getBodyCid(event);
        
        return request.payload;
    }
}