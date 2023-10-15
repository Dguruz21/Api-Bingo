import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

import { PaginationEntity } from "../../domain/entities/PaginationEntity";
import { PAGINATION } from "../../domain/constants/DomainConstant";

export class PaginationQuery<T extends ObjectLiteral> {
  private queryBuilder: SelectQueryBuilder<T>;
  private page: number;
  private perPage: number;

  constructor(
    queryBuilder: SelectQueryBuilder<T>,
    page: number = PAGINATION.CURRENT_PAGE,
    perPage: number = PAGINATION.PER_PAGE
  ) {
    this.queryBuilder = queryBuilder;
    this.page = page;
    this.perPage = perPage;
  }

  async getPaginatedResults(): Promise<PaginationEntity<T>> {
    if (this.page < 1) this.page = 1;

    if (this.perPage < 1) this.perPage = PAGINATION.PER_PAGE;

    const skip = (this.page - 1) * this.perPage;
    const queryBuilder = this.queryBuilder.clone();

    const [entities, total] = await Promise.all([
      queryBuilder.skip(skip).take(this.perPage).getMany(),
      queryBuilder.getCount(),
    ]);

    const response: PaginationEntity<T> = {
      entities,
      page: this.page,
      perPage: this.perPage,
      total,
    };

    return response;
  }

  static async of<T extends ObjectLiteral>(payload: {
    queryBuilder: SelectQueryBuilder<T>,
    page?: number,
    perPage?: number
  }) {
    const { queryBuilder, page = PAGINATION.CURRENT_PAGE, perPage = PAGINATION.PER_PAGE } = payload;

    return await (new PaginationQuery(queryBuilder, page, perPage)).getPaginatedResults();
  }
}
