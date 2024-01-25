import { AuthFixture, createAuthFixture } from '../__tests__/auth.fixture';

describe('On auth state change listener', () => {
  let fixture: AuthFixture;

  beforeEach(() => {
    fixture = createAuthFixture();
  });

  test('User is authenticated', () => {
    fixture.whenAuthStateChanged({
      id: 'user-id',
      email: 'john.doe@gmail.com',
    });
    fixture.thenUserIsLoggedInAs({
      id: 'user-id',
      email: 'john.doe@gmail.com',
    });
  });
});
