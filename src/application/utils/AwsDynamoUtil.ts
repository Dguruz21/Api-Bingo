import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { PutItemInput } from "aws-sdk/clients/dynamodb";
import { PayloadDynamoDb } from "../../domain/models/PayloadDynamoDb";
import { PayloadGetDynamoDb } from "../../domain/models/PayloadGetDynamoDb";
import { PayloadUpdateDynamoDb } from "../../domain/models/PayloadUpdateDynamoDb";

export class AwsDynamoUtil {

   static async createRecord<T>(payload: PayloadDynamoDb<T>, region?: string) {
      const documentClient = new DynamoDB.DocumentClient({
         region: region || process.env.REGION,
         maxRetries: 3,
         httpOptions: {
            timeout: 5000,
         },
      });

      const params: DocumentClient.PutItemInput = {
         TableName: payload.TableName,
         Item: payload.Item as PutItemInput,
      };

      return await documentClient.put(params).promise();
   }

   static async getRecord<T>(payload: PayloadGetDynamoDb<T>, region?: string) {
      const documentClient = new DynamoDB.DocumentClient({
         region: region || process.env.REGION,
         maxRetries: 3,
         httpOptions: {
            timeout: 5000,
         },
      });

      const params: DocumentClient.GetItemInput = {
         TableName: payload.TableName,
         Key: payload.Key as DynamoDB.DocumentClient.Key,
      };

      return await documentClient.get(params).promise();
   }

   static async updateRecord(payload: PayloadUpdateDynamoDb, region?: string) {
      const documentClient = new DynamoDB.DocumentClient({
         region: region || process.env.REGION,
         maxRetries: 3,
         httpOptions: {
            timeout: 5000,
         },
      });

      const params = {
         TableName: payload.TableName,
         Key: payload.Key,
         UpdateExpression: payload.UpdateExpression,
         ExpressionAttributeValues: payload.ExpressionAttributeValues,
         ReturnValues: payload.ReturnValues,
      };

      return await documentClient.update(params).promise();
   }
}
