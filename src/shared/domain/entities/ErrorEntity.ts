export interface ErrorEntity {
    code?: string;
    httpCode?: number;
    messages?: string | string[] | any,
    description?: string,
}