export interface PayloadUpdateDynamoDb {
   TableName: string;
   Key: any;
   UpdateExpression: string;
   ExpressionAttributeValues: any;
   ReturnValues: string;
}