export interface CabinZone {
    id: string;
    name: string;
    temperature: number;
    brightness: number;
  }
  
export interface CabinParameters {
    zones: CabinZone[];
  }