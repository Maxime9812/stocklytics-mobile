import { AuthFixture, createAuthFixture } from '../../__tests__/auth.fixture';
import { AuthUser } from '../../models/auth-user';
import { isRejected } from '@reduxjs/toolkit';

describe('Feature: Register', () => {
  let fixture: AuthFixture;

  beforeEach(() => {
    fixture = createAuthFixture();
  });
  test('User can register', async () => {
    const user: AuthUser = {
      id: 'user-id',
      fullName: 'John Doe',
      email: 'john.doe@gmail.com',
    };
    fixture.givenUserRegistered({
      registration: {
        fullName: 'John Doe',
        email: 'john.doe@gmail.com',
        password: 'password',
      },
      user,
    });
    await fixture.whenRegister({
      fullName: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'password',
    });
    fixture.thenUserIsLoggedInAs(user);
  });
  test('An error occur', async () => {
    const result = await fixture.whenRegister({
      fullName: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'password',
    });

    expect(isRejected(result)).toBeTruthy();
  });
});
