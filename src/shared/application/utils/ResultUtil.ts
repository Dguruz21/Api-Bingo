import { Mapper } from "../common/Mapper";
import { PaginationEntity } from "../../domain/entities/PaginationEntity";
import { ToListEntity } from "../../domain/entities/ToListEntity";
import { PaginationResult } from "../../domain/results/PaginationResult";

export class ResultUtil {
  static listOrPaginate<S, T>(
    instance: Mapper<S, T>,
    payload: S[] | PaginationEntity<S> | ToListEntity<S> | PaginationResult<S>
  ): PaginationResult<T> | ToListEntity<T> {
    if (payload instanceof Array) {
      return {
        entities: instance.transform(payload),
      };
    }

    if ("page" in payload) {
      return {
        entities: instance.transform(payload.entities),
        meta: {
          page: payload.page,
          per_page: payload.perPage,
          total: payload.total,
        },
      };
    }

    return {
      entities: instance.transform(payload.entities),
    };
  }
}
