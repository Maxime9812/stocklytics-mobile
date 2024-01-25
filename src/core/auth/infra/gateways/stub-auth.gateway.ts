import { AuthGateway, LoginPayload } from '../../hexagon/gateways/auth.gateway';
import { AuthUser } from '../../hexagon/models/auth-user';

export type UserWithCredentials = {
  credentials: LoginPayload;
  user: AuthUser;
};

export class StubAuthGateway implements AuthGateway {
  private userForLogin: Map<string, AuthUser> = new Map();
  async login(payload: LoginPayload): Promise<AuthUser | undefined> {
    return this.userForLogin.get(this.credentialsToString(payload));
  }

  logout(): Promise<void> {
    return Promise.resolve(undefined);
  }

  givenUserWithCredentials(userWithCredentials: UserWithCredentials) {
    this.userForLogin.set(
      this.credentialsToString(userWithCredentials.credentials),
      userWithCredentials.user,
    );
  }

  private credentialsToString(credentials: LoginPayload): string {
    return `${credentials.email}:${credentials.password}`;
  }
}
