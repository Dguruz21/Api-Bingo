export interface TracePayload {
    traceId?: string;
    timestamp?: string;
    moduleId?: string,
    serviceId?: string,
    consumerId?: string,
    channelId?: string | string[],
}