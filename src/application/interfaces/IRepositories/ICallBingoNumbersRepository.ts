export interface ICallBingoNumbersRepository {
   checkIfGameExists: (payload: any) => Promise<boolean>;

   checkCurrentNumbers: (payload: any) => Promise<object>;

   createFirstNumber: (payload: any) => Promise<void>;
}
