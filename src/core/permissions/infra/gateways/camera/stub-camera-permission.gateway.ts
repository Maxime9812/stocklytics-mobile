import { CameraPermissionGateways } from '../../../hexagon/gateways/camera-permission.gateways';

export class StubCameraPermissionGateway implements CameraPermissionGateways {
  private requestPermissionResponse: boolean = false;
  cameraPermissionIsAsked: boolean = false;
  checkPermission(): Promise<boolean> {
    return Promise.resolve(false);
  }

  async requestPermission(): Promise<boolean> {
    this.cameraPermissionIsAsked = true;
    return this.requestPermissionResponse;
  }

  givenRequestPermissionResponse(response: boolean) {
    this.requestPermissionResponse = response;
  }
}
