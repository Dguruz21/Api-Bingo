export interface IBingoRepository {

   createCard: (payload: any) => Promise<void>;

   createGame: (payload: any) => Promise<void>;

   checkIfGameExists: (idGame: string) => Promise<boolean>;

   checkIfCardExists(idCard: string): Promise<boolean>;

   checkCurrentNumbers: (idGame: string) => Promise<object>;

   createFirstNumber: (idGame: string) => Promise<void>;

   createNextNumbers(payload: any): Promise<object>;

   getPlayerBalls(idCard: string): Promise<object>;

   scanCards(): Promise<object>;
}
