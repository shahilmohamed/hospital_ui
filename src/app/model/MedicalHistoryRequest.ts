import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
import { Prescription } from "./Prescription";

export interface MedicalHistoryRequest {
    diagnosisDate: Date;
    diagnosis: string;
    revisitDate: string;
    review: string;
    doctor: Doctor;
    patient: Patient;
    prescriptions: Prescription[];
    appointment_id: number;
}