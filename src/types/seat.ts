export interface Seat {
    id: string; // 1A, 1B etc
    zone: string;
    assignedPassengerId?: string;
    status: 'available' | 'occupied' | 'reserved';
  }