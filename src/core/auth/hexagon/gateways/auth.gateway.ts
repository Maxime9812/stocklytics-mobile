import { AuthUser } from '../models/auth-user';

export type LoginPayload = {
  email: string;
  password: string;
};

export interface AuthGateway {
  login(payload: LoginPayload): Promise<AuthUser | undefined>;
  logout(): Promise<void>;
}
