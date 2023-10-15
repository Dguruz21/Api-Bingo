import { CreateBingoGameResult } from "../../../domain/results/CreateBingoGameResult";

export interface ICreateBingoGameService {
   executeCreateGame: () => Promise<CreateBingoGameResult>;
}
