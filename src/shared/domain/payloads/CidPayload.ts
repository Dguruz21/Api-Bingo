import { TracePayload } from "./TracePayload";

export interface CidPayload<T> {
    request: {
        trace: TracePayload,
        payload: T
    },
}