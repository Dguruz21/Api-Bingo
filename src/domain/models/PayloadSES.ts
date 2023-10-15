export interface PayloadSES {
   from: string;
   to: string;
   subject: string;
   textMessage: string;
   htmlMessage?: string;
   replyTo?: string;
   region?: string;
}