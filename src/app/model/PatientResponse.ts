import { Patient } from "./patient";

export interface PatientResponse {
    status: number;
    message: string;
    data: Patient[];
}