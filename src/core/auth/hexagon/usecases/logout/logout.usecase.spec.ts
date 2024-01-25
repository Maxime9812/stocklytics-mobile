import { AuthFixture, createAuthFixture } from '../../__tests__/auth.fixture';

describe('Feature: Logout', () => {
  let fixture: AuthFixture;

  beforeEach(() => {
    fixture = createAuthFixture();
  });

  test('User can logout', async () => {
    await fixture.whenLogout();
    fixture.thenUserIsNotLoggedIn();
    fixture.thenLogoutWasCalled();
  });
});
