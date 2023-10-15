export interface PaginationEntity<T> {
    entities: T[];
    page: number;
    perPage: number;
    total: number;
}