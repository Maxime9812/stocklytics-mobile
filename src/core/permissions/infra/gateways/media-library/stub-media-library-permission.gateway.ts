import { MediaLibraryPermissionGateway } from '../../../hexagon/gateways/media-library-permission.gateway';

export class StubMediaLibraryPermissionGateway
  implements MediaLibraryPermissionGateway
{
  private requestPermissionResponse: boolean = false;
  permissionIsAsked: boolean = false;
  private hasPermission: boolean = false;

  constructor(private delay: number = 0) {}

  async checkPermission(): Promise<boolean> {
    return this.hasPermission;
  }

  async requestPermission(): Promise<boolean> {
    await new Promise((resolve) => {
      setTimeout(resolve, this.delay);
    });

    this.permissionIsAsked = true;
    return this.requestPermissionResponse;
  }

  givenRequestPermissionResponse(response: boolean) {
    this.requestPermissionResponse = response;
  }

  givenHasPermission(hasPermission: boolean) {
    this.hasPermission = hasPermission;
  }
}
