import { injectable } from "tsyringe";
// import { FindManyOptions, FindOptionsOrder, Like } from "typeorm";

import { PaginationQuery } from "../../../../../shared/infrastructure/repositories/PaginationQuery";
import { ORDER, STATE } from "../../../../../shared/domain/constants/DomainConstant";
import { TracePayload } from "../../../../../shared/domain/payloads/TracePayload";
import { IRecordsExamRepository } from "../../application/interfaces/IRecordsExamRepository";
import { RecordsExamPayload } from "../../domain/payloads/RecordsExamPayload";
import { MedicalExamType } from "../../domain/entities/MedicalExamType";

@injectable()
export class RecordsExamRepository implements IRecordsExamRepository {
  /**
   * @param {RecordsExamPayload} payload carga de la petición
   * @param {TracePayload} trace rastro de la petición
   * @returns
   */
  async records(payload: RecordsExamPayload, trace: TracePayload) {
    const medicalExamTypeRepository = MedicalExamType.getRepository();

    const queryBuilder = medicalExamTypeRepository
      .createQueryBuilder("htem")
      .select([
        "htem.id",
        "htem.description",
        "htem.segusCode",
        "htem.hisCode",
        "htem.type",
        "htem.state",
        "htemc.channelId",
        "htemc.state",
      ])
      .innerJoin("htem.medicalExamTypeChannels", "htemc")
      .where(
        "(htem.description LIKE :searchTerm OR htem.segusCode LIKE :searchTerm OR htem.hisCode LIKE :searchTerm)"
      )
      .andWhere("htem.state = :examState")
      .andWhere("htemc.channelId = :channelId")
      .andWhere("htemc.state = :channelState")
      .groupBy("htem.id")
      .setParameters({
        searchTerm: `%${payload.search || ''}%`,
        examState: STATE.ACT,
        channelId: trace.channelId,
        channelState: STATE.ACT,
        ...(payload.type && { examType: payload.type }),
      });

    if (payload.type) {
      queryBuilder.andWhere("htem.type = :examType");
    }

    if (payload.order_by) {
      const order = payload.order_by == ORDER.ASC ? 'ASC' : 'DESC';

      queryBuilder.orderBy("htem.description", order);
    }

    return payload.page
      ? await PaginationQuery.of({
          page: payload.page,
          perPage: payload.per_page,
          queryBuilder,
        })
      : await queryBuilder.getMany();

    // const filter: FindManyOptions<MedicalExamType>["where"] = [
    //   {
    //     description: Like(`${payload.search || ''}`), // dscTipoExamenMedico
    //   },
    //   {
    //     segusCode: Like(`${payload.search || ''}`), // codigoSegus
    //   },
    //   {
    //     hisCode: Like(`${payload.search || ''}`), // codigoHis
    //   },
    //   {
    //     state: 'ACT', // stsTipoExamenMedio
    //   },
    //   {
    //     medicalExamTypeChannels: {
    //       state: 'ACT', // stsTipoExamenMedicoChannel
    //     }
    //   },
    //   {

    //   },
    // ];

    // const select = [
    //   "id",
    //   "description",
    //   "segusCode",
    //   "hisCode",
    //   "type",
    //   "state",
    // ];

    // const join = {
    //   alias: "htem",
    //   innerJoin: {
    //     medicalExamTypeChannels: "htem.medicalExamTypeChannels",
    //   },
    // };

    // where: (qb) => {
    //   qb.where("(description LIKE :searchTerm OR segusCode LIKE :searchTerm OR hisCode LIKE :searchTerm)", { searchTerm })
    //     .andWhere("state = :examState", { examState: "ACT" });
    // },

    // if (payload.type) filter.push({ type: payload.type }); // tipo

    // const order: FindOptionsOrder<MedicalExamType>= {
    //   description: "ASC"
    // };

    // const relations = ['medicalExamTypeChannels'];

    // const payloads = {
    //   page: payload.page,
    //   perPage: payload.per_page,
    //   filter,
    //   order,
    //   relations
    // }

    // return payload.page ? await Paginate.of(MedicalExamType.getRepository(), payloads): await MedicalExamType.findAndCount({
    //   filter,
    //   relations,
    //   order,
    // });
  }
}
