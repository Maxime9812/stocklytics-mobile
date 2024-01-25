import { AuthUser } from '../../models/auth-user';
import { LoginPayload } from '../../gateways/auth.gateway';
import { isRejected } from '@reduxjs/toolkit';
import { AuthFixture, createAuthFixture } from '../../__tests__/auth.fixture';

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
