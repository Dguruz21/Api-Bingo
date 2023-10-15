import { SES } from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';
import { PayloadSES } from '../../domain/models/PayloadSES';

export class AwsSESUtil {
   static async sendEmail(payload: PayloadSES): Promise<void> {
      const {
         from,
         to,
         subject,
         textMessage,
         htmlMessage,
         replyTo,
         region,
      } = payload;

      const ses = new SES({ region: region || process.env.REGION });

      const emailParams: SendEmailRequest = {
         Destination: {
            ToAddresses: [to],
         },
         Message: {
            Body: {
               ...(htmlMessage && {
                  Html: {
                     Data: htmlMessage,
                  }
               }
               ),
               Text: {
                  Data: textMessage,
               },
            },
            Subject: {
               Data: subject,
            },
         },
         Source: from,
         ReplyToAddresses: replyTo ? [replyTo] : undefined,
      };

      try {
         await ses.sendEmail(emailParams).promise();
         console.log('Email sent successfully');
      } catch (error) {
         console.error('Error sending email:', error);
         throw error;
      }
   }
}