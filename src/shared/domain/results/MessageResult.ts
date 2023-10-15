export class MessageResult {
    private message: string
  
    constructor (message: string) {
      this.message = message;
    }
  
    private getResponse() {
      return {
        message: this.message
      }
    }
  
    static Of(message: string) {
      return new MessageResult(message).getResponse();
    }
  }
  