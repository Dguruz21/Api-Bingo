export interface ICallBingoNumbersRepository {
   checkIfGameExists: (idGame: string) => Promise<boolean>;

   checkCurrentNumbers: (idGame: string) => Promise<object>;

   createFirstNumber: (idGame: string) => Promise<void>;

   createNextNumbers(payload: any): Promise<object>;

   scanCards(): Promise<object>;
}
