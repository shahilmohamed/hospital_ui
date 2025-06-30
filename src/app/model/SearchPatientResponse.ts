import { SearchPatient } from "./SearchPatient";

export interface SearchPatientResponse {
    status: number;
    message: string;
    data: SearchPatient[];
}