import { CreateBingoCardResult } from "../../../domain/results/CreateBingoCardResult";


export interface ICreateBingoCardService {
   executeCreateCard: () => Promise<CreateBingoCardResult>;
}
