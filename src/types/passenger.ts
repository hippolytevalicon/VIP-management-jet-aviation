export interface PassengerPreferences {
    dietary: string[];
    temperature: number;
    otherRequirements?: string[];
  }
  
  export interface Passenger {
    id: string;
    name: string;
    currentSeat?: string;
    preferences: PassengerPreferences;
  }
  
  export interface PassengerHistory {
    id: string;
    name: string;
    previousPreferences: Array<{
      flightId: string;
      date: string;
      preferences: PassengerPreferences;
    }>;
  }