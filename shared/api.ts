export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface DemoResponse {
  message: string;
}

export interface AlumniItem {
  id: string;
  name: string;
  avatar?: string;
  batch?: string;
  company?: string;
  role?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location?: string;
  cover?: string;
}
