import { CreateBingoGameResult } from "../../domain/results/CreateBingoGameResult";

export interface ICreateBingoGameService {
   execute: () => Promise<CreateBingoGameResult>;
}
