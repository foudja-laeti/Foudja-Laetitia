export enum UserRole {
  ADMIN = 'ADMIN',
  PROVISEUR = 'PROVISEUR',
  SURVEILLANT = 'SURVEILLANT',
  ENSEIGNANT = 'ENSEIGNANT',
  ETUDIANT = 'ETUDIANT'
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  phoneNumber?: string;
  department?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}