import { AuthFixture, createAuthFixture } from '../__tests__/auth.fixture';
import { authUserBuilder } from '../__tests__/auth-user.builder';

describe('On auth state change listener', () => {
  let fixture: AuthFixture;

  beforeEach(() => {
    fixture = createAuthFixture();
  });

  test('User is authenticated', () => {
    const authUser = authUserBuilder().withId('user-id').build();
    fixture.whenAuthStateChanged(authUser);
    fixture.thenUserIsLoggedInAs(authUser);
  });
});
