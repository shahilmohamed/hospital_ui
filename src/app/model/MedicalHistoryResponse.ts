import { PatientHistory } from './PatientHistory';

export interface MedicalHistoryResponse {
  status: number;
  message: string;
  data: PatientHistory[];
}
