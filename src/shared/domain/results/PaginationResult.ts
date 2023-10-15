export interface PaginationResult<T> {
    entities: T[];
    meta: {
        page: number;
        per_page: number;
        total: number;
    }
}