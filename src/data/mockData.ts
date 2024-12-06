import { CabinZone, Seat } from '../types';

export const mockCabinZones: CabinZone[] = [
  {
    id: "Z1",
    name: "Front Cabin",
    temperature: 23,
    brightness: 80
  },
  {
    id: "Z2",
    name: "Mid Cabin",
    temperature: 22,
    brightness: 70
  }
];

export const mockSeats: Seat[] = [
  {
    id: "1A",
    zone: "Z1",
    status: 'occupied',
    assignedPassengerId: "P1"
  },
  {
    id: "1B",
    zone: "Z1",
    status: 'available'
  },
  {
    id: "2A",
    zone: "Z1",
    status: 'occupied',
    assignedPassengerId: "P2"
  },
  {
    id: "2B",
    zone: "Z1",
    status: 'available'
  },
  {
    id: "3A",
    zone: "Z2",
    status: 'available'
  },
  {
    id: "3B",
    zone: "Z2",
    status: 'available'
  }
];