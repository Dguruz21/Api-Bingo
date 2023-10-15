import AWS from "aws-sdk";
const ssm = new AWS.SSM();

export class AwsSSMUtil {
  /**
   * Obtener parametro ssm
   * @param {string} parameterPaths
   * @returns
   */
  static async loadParameters(parameterPaths: string) {
    const params = {
      Name: parameterPaths,
      WithDecryption: true,
    };

    const request: any = await ssm.getParameter(params).promise();

    return request.Parameter.Value;
  }
}
