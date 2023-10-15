import * as z from 'zod'

import { STRING, NUMBER, POSITIVE } from '../../../../../shared/domain/constants/MessageConstant'
import { ORDER } from '../../../../../shared/domain/constants/DomainConstant'

export const RecordsExamSchema = z.object({
  search: z.string({
          invalid_type_error: STRING.invalid_type_error,
        })
        .optional(),
  type: z.number({
          invalid_type_error: NUMBER.invalid_type_error,
        })
        .positive({
          message: POSITIVE.message,
        })
        .optional(),
  page: z.number({
          invalid_type_error: NUMBER.invalid_type_error,
        })
        .positive({
          message: POSITIVE.message,
        })
        .optional(),
  per_page: z.number({
          invalid_type_error: NUMBER.invalid_type_error,
        })
        .positive({
          message: POSITIVE.message,
        })
        .optional(),
  order_by: z.enum([
          ORDER.ASC,
          ORDER.DESC,
        ])
        .optional(),
});

export type RecordsExamPayload = z.infer<typeof RecordsExamSchema>