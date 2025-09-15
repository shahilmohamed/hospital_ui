export interface PatientHistory {
    id: number;
    diagnosisDate: string;
    diagnosis: string;
    revisitDate: string;
    review: string;
    doctor_id: number;
    patient_id: number;
}