import { History } from './History';

export interface MedicalHistoryResponse {
  status: number;
  message: string;
  data: History[];
}
