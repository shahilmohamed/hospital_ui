import { Appointment } from "./Appointment";

export interface AppointmentResponse {
    status: number;
    message: string;
    data: Appointment[];
}