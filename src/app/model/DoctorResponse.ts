import { Doctor } from "./Doctor";

export interface DoctorResponse {
    status: number;
    message: string;
    data: Doctor[];
}