export interface PayloadDynamoDb<T> {
   TableName: string;
   Item: T;
}