import {
  createPermissionsFixture,
  PermissionsFixture,
} from '../../../__tests__/permissions.fixture';

describe('Feature: Request Camera Permission', () => {
  let fixture: PermissionsFixture;

  beforeEach(() => {
    fixture = createPermissionsFixture();
  });

  test('User is asked for permission', async () => {
    await fixture.whenRequestCameraPermission();
    fixture.thenCameraPermissionShouldBeAsked();
  });

  test('User accepts permission', async () => {
    fixture.givenCameraPermissionRequestGranted();
    await fixture.whenRequestCameraPermission();
    fixture.thenShouldHaveCameraPermission();
  });

  test('User denies permission', async () => {
    fixture.givenCameraPermissionRequestDenied();
    await fixture.whenRequestCameraPermission();
    fixture.thenShouldNotHaveCameraPermission();
  });
});
