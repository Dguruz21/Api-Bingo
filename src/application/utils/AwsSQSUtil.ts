import { SQS } from 'aws-sdk';
import { PayloadSQS } from '../../domain/models/PayloadSQS';

export class AwsSQSUtil {
   static async execute(params: PayloadSQS): Promise<void> {
      try {
         const sqs = new SQS();

         await sqs.sendMessage(params).promise();
      } catch (error) {
         console.error('Error al enviar mensaje:', error);
      }
   }
}
