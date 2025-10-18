export interface Prescription {
  id: number;
  name: string;
  durationDays: number;
  dosageMorning: boolean;
  dosageAfternoon: boolean;
  dosageNight: boolean;
}
