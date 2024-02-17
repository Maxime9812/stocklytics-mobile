import { createTestStore, TestStore } from '../../create-store';
import { requestCameraPermissionUseCase } from '../hexagon/usecases/request-camera-permission/request-camera-permission.usecase';
import { stateBuilder } from '../../state-builder';
import { StubCameraPermissionGateway } from '../infra/gateways/camera/stub-camera-permission.gateway';
import { StubMediaLibraryPermissionGateway } from '../infra/gateways/media-library/stub-media-library-permission.gateway';
import { requestMediaLibraryPermissionUseCase } from '../hexagon/usecases/request-media-library-permission/request-media-library-permission.usecase';

export const createPermissionsFixture = () => {
  let store: TestStore;
  const cameraPermissionGateway = new StubCameraPermissionGateway();
  const mediaLibraryPermissionGateway = new StubMediaLibraryPermissionGateway();

  return {
    givenMediaLibraryPermissionRequestGranted: () => {
      mediaLibraryPermissionGateway.givenRequestPermissionResponse(true);
    },
    givenMediaLibraryPermissionRequestDenied: () => {
      mediaLibraryPermissionGateway.givenRequestPermissionResponse(false);
    },
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
    whenRequestMediaLibraryPermission: () => {
      store = createTestStore({ mediaLibraryPermissionGateway });
      return store.dispatch(requestMediaLibraryPermissionUseCase());
    },
    thenCameraPermissionShouldBeAsked: () => {
      expect(cameraPermissionGateway.cameraPermissionIsAsked).toBe(true);
    },
    thenMediaLibraryPermissionShouldBeAsked: () => {
      expect(mediaLibraryPermissionGateway.permissionIsAsked).toBe(true);
    },
    thenShouldHaveCameraPermission: () => {
      expect(store.getState()).toEqual(
        stateBuilder().withCameraPermission(true).build(),
      );
    },
    thenShouldHaveMediaLibraryPermission: () => {
      expect(store.getState()).toEqual(
        stateBuilder().withMediaLibraryPermission(true).build(),
      );
    },
    thenShouldNotHaveCameraPermission: () => {
      expect(store.getState()).toEqual(
        stateBuilder().withCameraPermission(false).build(),
      );
    },
    thenShouldNotHaveMediaLibraryPermission: () => {
      expect(store.getState()).toEqual(
        stateBuilder().withMediaLibraryPermission(false).build(),
      );
    },
  };
};

export type PermissionsFixture = ReturnType<typeof createPermissionsFixture>;
