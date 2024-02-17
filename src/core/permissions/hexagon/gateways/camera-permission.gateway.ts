export interface CameraPermissionGateway {
  requestPermission(): Promise<boolean>;
  checkPermission(): Promise<boolean>;
}
