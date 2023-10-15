export interface PayloadGetDynamoDb<T> {
   TableName: string;
   Key: T;
}