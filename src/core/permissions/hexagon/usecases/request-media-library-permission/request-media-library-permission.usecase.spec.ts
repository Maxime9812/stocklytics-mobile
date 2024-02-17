import {
  createPermissionsFixture,
  PermissionsFixture,
} from '../../../__tests__/permissions.fixture';

describe('Feature: Request Media Library Permission', () => {
  let fixture: PermissionsFixture;

  beforeEach(() => {
    fixture = createPermissionsFixture();
  });

  test('User is asked for permission', async () => {
    await fixture.whenRequestMediaLibraryPermission();
    fixture.thenMediaLibraryPermissionShouldBeAsked();
  });

  test('User accepts permission', async () => {
    fixture.givenMediaLibraryPermissionRequestGranted();
    await fixture.whenRequestMediaLibraryPermission();
    fixture.thenShouldHaveMediaLibraryPermission();
  });

  test('User denies permission', async () => {
    fixture.givenMediaLibraryPermissionRequestDenied();
    await fixture.whenRequestMediaLibraryPermission();
    fixture.thenShouldNotHaveMediaLibraryPermission();
  });
});
