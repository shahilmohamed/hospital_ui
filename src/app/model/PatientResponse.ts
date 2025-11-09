import { Patient } from "./Patient";

export interface PatientResponse {
    status: number;
    message: string;
    data: Patient[];
    totalPage: number;
    totalCount: number;
}