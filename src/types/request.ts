export type RequestStatus = 'pending' | 'in-progress' | 'completed';
export type RequestType = 'meal' | 'drink' | 'temperature' | 'light' | 'emergency';

export interface Request {
  id: string;
  passengerId: string;
  type: RequestType;
  status: RequestStatus;
  details: string;
  timestamp: string;
}