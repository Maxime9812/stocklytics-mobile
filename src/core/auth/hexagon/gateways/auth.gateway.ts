import { AuthUser } from '../models/auth-user';

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

export interface AuthGateway {
  login(payload: LoginPayload): Promise<AuthUser | undefined>;
  logout(): Promise<void>;
  register(payload: RegisterPayload): Promise<AuthUser | undefined>;
  onAuthStateChanged(callback: (user: AuthUser | undefined) => void): void;
}
