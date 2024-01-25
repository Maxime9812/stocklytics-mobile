import { AppStore, createTestStore } from '../../../../create-store';
import { stateBuilder } from '../../../../state-builder';
import {
  StubAuthGateway,
  UserWithCredentials,
} from '../../../infra/gateways/stub-auth.gateway';
import { loginUseCase, LoginUseCasePayload } from './login.usecase';
import { AuthUser } from '../../models/auth-user';
import { LoginPayload } from '../../gateways/auth.gateway';
import { isRejected } from '@reduxjs/toolkit';

describe('Feature: Login user', () => {
  let fixture: AuthFixture;

  beforeEach(() => {
    fixture = createAuthFixture();
  });

  test('John should be able to login', async () => {
    const credentials: LoginPayload = {
      email: 'john.doe@gmail.com',
      password: 'password12345',
    };
    const user: AuthUser = {
      id: 'user-id',
      email: 'john.doe@gmail.com',
    };

    fixture.givenUserCredentials({
      credentials,
      user,
    });
    await fixture.whenLogin(credentials);
    fixture.thenUserIsLoggedInAs(user);
  });

  test('John use wrong password', async () => {
    const credentials: LoginPayload = {
      email: 'john.doe@gmail.com',
      password: 'wrong-password12345',
    };
    const result = await fixture.whenLogin(credentials);

    expect(isRejected(result)).toBeTruthy();
  });
});

const createAuthFixture = () => {
  const authGateway = new StubAuthGateway();
  let store: AppStore;

  return {
    givenUserCredentials: (userWithCredentials: UserWithCredentials) => {
      authGateway.givenUserWithCredentials(userWithCredentials);
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

type AuthFixture = ReturnType<typeof createAuthFixture>;
