import { Prescription } from './Prescription';

export interface PrescriptionResponse {
  status: number;
  message: string;
  data: Prescription[];
}
