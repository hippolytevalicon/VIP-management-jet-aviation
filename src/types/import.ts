import { PassengerPreferences } from './passenger';

export interface PassengerImport {
  passengerId: string;
  name: string;
  requestedSeat?: string;
  preferences?: PassengerPreferences;
}