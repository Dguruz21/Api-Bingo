import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { PutItemInput } from "aws-sdk/clients/dynamodb";
import { PayloadDynamoDb } from "../../domain/models/PayloadDynamoDb";
import { PayloadGetDynamoDb } from "../../domain/models/PayloadGetDynamoDb";
import { PayloadUpdateDynamoDb } from "../../domain/models/PayloadUpdateDynamoDb";

export class AwsDynamoUtil {

   static DinamoDocumentClient = new DynamoDB.DocumentClient({
      region: process.env.REGION,
      maxRetries: 3,
      httpOptions: {
         timeout: 5000,
      },
   });


   static async createRecord<T>(payload: PayloadDynamoDb<T>) {
      const params: DocumentClient.PutItemInput = {
         TableName: payload.TableName,
         Item: payload.Item as PutItemInput,
      };

      return await AwsDynamoUtil.DinamoDocumentClient.put(params).promise();
   }

   static async scanRecords(table: string) {

      const params: DocumentClient.ScanInput = {
         TableName: table,
      };

      return await AwsDynamoUtil.DinamoDocumentClient.scan(params).promise();
   }

   static async getRecord<T>(payload: PayloadGetDynamoDb<T>) {

      const params: DocumentClient.GetItemInput = {
         TableName: payload.TableName,
         Key: payload.Key as DynamoDB.DocumentClient.Key,
      };

      return await AwsDynamoUtil.DinamoDocumentClient.get(params).promise();
   }

   static async updateRecord(payload: PayloadUpdateDynamoDb) {
      const params = {
         TableName: payload.TableName,
         Key: payload.Key,
         UpdateExpression: payload.UpdateExpression,
         ExpressionAttributeValues: payload.ExpressionAttributeValues,
         ReturnValues: payload.ReturnValues,
      };

      return await AwsDynamoUtil.DinamoDocumentClient.update(params).promise();
   }
}
