import { AnyZodObject, z, ZodError } from "zod";
import { badRequest } from "@hapi/boom";

import { BusinessError } from "../common/BusinessError";

interface ZodErrorValue {
  _errors?: any;
}

export class Validate {
  static validateRequest<T extends AnyZodObject>(
    req: any,
    schema: T
  ): z.infer<T> {
    try {
      return schema.parse(req);
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: ZodErrorValue = error.format();

        delete errors._errors;

        const format = Object.entries(errors).reduce(
          (current: any, [name, entity]) => {
            current[name] = entity._errors;
            return current;
          },
          {}
        );

        throw new BusinessError({
          httpCode: 422,
          code: "ERR-CID-BAD-REQUEST",
          messages: format!,
        });
      }
      throw badRequest(JSON.stringify(error));
    }
  }
}
