import {
  StubAuthGateway,
  UserWithCredentials,
} from '../../infra/gateways/stub-auth.gateway';
import { AppStore, createTestStore } from '../../../create-store';
import {
  loginUseCase,
  LoginUseCasePayload,
} from '../usecases/login/login.usecase';
import { AuthUser } from '../models/auth-user';
import { stateBuilder } from '../../../state-builder';

export const createAuthFixture = () => {
  const authGateway = new StubAuthGateway();
  let store: AppStore;

  return {
    givenUserCredentials: (userWithCredentials: UserWithCredentials) => {
      authGateway.givenUserWithCredentials(userWithCredentials);
    },
    whenAuthStateChanged: (authUser: AuthUser) => {
      store = createTestStore({ authGateway });
      authGateway.simulateAuthStateChanged(authUser);
    },
    whenLogin: (payload: LoginUseCasePayload) => {
      store = createTestStore({ authGateway });
      return store.dispatch(loginUseCase(payload));
    },
    thenUserIsLoggedInAs: (authUser: AuthUser) => {
      expect(store.getState()).toEqual(
        stateBuilder().withAuthUser(authUser).build(),
      );
    },
  };
};

export type AuthFixture = ReturnType<typeof createAuthFixture>;
