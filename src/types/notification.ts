export interface Notification {
    id: string;
    type: 'request' | 'emergency' | 'flight';
    message: string;
    timestamp: string;
    read: boolean;
    seatId?: string;
    requestId?: string; 
  }