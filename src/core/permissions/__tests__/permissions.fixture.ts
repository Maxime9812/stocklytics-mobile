import { createTestStore, TestStore } from '../../create-store';
import { requestCameraPermissionUseCase } from '../hexagon/usecases/request-camera-permission/request-camera-permission.usecase';
import { stateBuilder } from '../../state-builder';
import { StubCameraPermissionGateway } from '../infra/gateways/camera/stub-camera-permission.gateway';

export const createPermissionsFixture = () => {
  let store: TestStore;
  const cameraPermissionGateway = new StubCameraPermissionGateway();

  return {
    givenCameraPermissionRequestGranted: () => {
      cameraPermissionGateway.givenRequestPermissionResponse(true);
    },
    givenCameraPermissionRequestDenied: () => {
      cameraPermissionGateway.givenRequestPermissionResponse(false);
    },
    whenRequestCameraPermission: () => {
      store = createTestStore({ cameraPermissionGateway });
      return store.dispatch(requestCameraPermissionUseCase());
    },
    thenCameraPermissionShouldBeAsked: () => {
      expect(cameraPermissionGateway.cameraPermissionIsAsked).toBe(true);
    },
    thenShouldHaveCameraPermission: () => {
      expect(store.getState()).toEqual(
        stateBuilder().withCameraPermission(true).build(),
      );
    },
    thenShouldNotHaveCameraPermission: () => {
      expect(store.getState()).toEqual(
        stateBuilder().withCameraPermission(false).build(),
      );
    },
  };
};

export type PermissionsFixture = ReturnType<typeof createPermissionsFixture>;
