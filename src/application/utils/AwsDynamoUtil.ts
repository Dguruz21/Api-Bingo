import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { PutItemInput } from "aws-sdk/clients/dynamodb";
import { PayloadDynamoDb } from "../../domain/models/PayloadDynamoDb";

export class AwsDynamoUtil {
   static async createRecord<T extends PutItemInput>(payload: PayloadDynamoDb<T>, region?: string) {
      const documentClient = new DynamoDB.DocumentClient({
         region: region || process.env.REGION,
         maxRetries: 3,
         httpOptions: {
            timeout: 5000,
         },
      });

      const params: DocumentClient.PutItemInput = {
         TableName: payload.TableName,
         Item: payload.Item,
      };

      return await documentClient.put(params).promise();
   }
}
