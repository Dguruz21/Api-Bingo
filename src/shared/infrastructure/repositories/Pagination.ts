import { FindManyOptions, ObjectLiteral, Repository } from "typeorm";

import { PAGINATION } from "../../domain/constants/DomainConstant";
import { PaginationEntity } from "../../domain/entities/PaginationEntity";

export class Pagination<T extends ObjectLiteral> {
  private repository: Repository<T>;
  private page: number;
  private perPage: number;

  constructor(
    repository: Repository<T>,
    page: number = PAGINATION.CURRENT_PAGE,
    perPage: number = PAGINATION.PER_PAGE
  ) {
    this.repository = repository;
    this.page = page;
    this.perPage = perPage;
  }

  async getPaginatedResults(payload: {
    filter?: FindManyOptions<T>["where"];
    order?: FindManyOptions<T>["order"];
    relations?: FindManyOptions<T>["relations"];
    options?: FindManyOptions<T>;
  }): Promise<PaginationEntity<T>> {
    const { filter, order, relations, options } = payload;

    if (this.page < 1) this.page = 1;

    if (this.perPage < 1) this.perPage = PAGINATION.PER_PAGE;

    const [entities, total] = await this.repository.findAndCount({
      skip: (this.page - 1) * this.perPage,
      take: this.perPage,
      ...(filter && { where: filter }),
      ...(relations && { relations }),
      ...(order && { order }),
      ...(options && { options }),
    });

    const response: PaginationEntity<T> = {
      entities,
      page: this.page,
      perPage: this.perPage,
      total,
    };

    return response;
  }

  static async of<T extends ObjectLiteral>(
    entity: Repository<T>,
    payload: {
      page?: number;
      perPage?: number;
      relations?: FindManyOptions<T>["relations"];
      filter?: FindManyOptions<T>["where"];
      order?: FindManyOptions<T>["order"];
      options?: FindManyOptions<T>;
    }
  ): Promise<PaginationEntity<T>> {
    const {
      page = PAGINATION.CURRENT_PAGE,
      perPage = PAGINATION.PER_PAGE,
      filter,
      relations,
      order,
      options,
    } = payload;

    return await (new Pagination(entity, page, perPage)).getPaginatedResults({
      filter,
      order,
      relations,
      options,
    });
  }
}
