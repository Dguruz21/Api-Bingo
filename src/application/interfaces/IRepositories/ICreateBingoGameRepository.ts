export interface ICreateBingoGameRepository {
   createGame: (payload: any) => Promise<void>;
}
