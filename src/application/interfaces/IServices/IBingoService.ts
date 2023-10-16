import { CreateBingoGameResult } from "../../../domain/results/CreateBingoGameResult";
import { CreateBingoCardResult } from "../../../domain/results/CreateBingoCardResult";
import { PayloadSES } from "../../../domain/models/PayloadSES";

export interface IBingoService {
   executeCallNumbers: (gameId: string) => Promise<object>;
   executeCheckBingoWinner(payload: any): Promise<object>
   executeCreateCard(payload: any): Promise<CreateBingoCardResult>;
   executeCreateGame(): Promise<CreateBingoGameResult>;
   executeEmailNotification(payload: PayloadSES): Promise<void>;

   executeGetAllCards(): Promise<object>;
}
