export type UserRole = 'staff' | 'seat';

export interface User {
  id: string;
  role: UserRole;
  username: string;  // for staff: username, for seat: seat number (1A etc)
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

//staff credentials for now
export const STAFF_CREDENTIALS = {
  username: 'staff',
  password: 'vipstaff123'
};

//setas
export const AVAILABLE_SEATS = ['1A', '1B', '2A', '2B', '3A', '3B'];