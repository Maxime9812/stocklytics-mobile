import { CameraPermissionGateway } from '../../../hexagon/gateways/camera-permission.gateway';

export class StubCameraPermissionGateway implements CameraPermissionGateway {
  private requestPermissionResponse: boolean = false;
  cameraPermissionIsAsked: boolean = false;
  private hasPermission: boolean = false;

  constructor(private delay: number = 0) {}

  async checkPermission(): Promise<boolean> {
    return this.hasPermission;
  }

  async requestPermission(): Promise<boolean> {
    await new Promise((resolve) => {
      setTimeout(resolve, this.delay);
    });

    this.cameraPermissionIsAsked = true;
    return this.requestPermissionResponse;
  }

  givenRequestPermissionResponse(response: boolean) {
    this.requestPermissionResponse = response;
  }

  givenHasPermission(hasPermission: boolean) {
    this.hasPermission = hasPermission;
  }
}
