import { AuthGateway, LoginPayload } from '../../gateways/auth.gateway';
import { AuthUser } from '../../models/auth-user';

export class StubAuthGateway implements AuthGateway {
  async login(payload: LoginPayload): Promise<AuthUser> {
    throw new Error('Method not implemented.');
  }

  logout(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
