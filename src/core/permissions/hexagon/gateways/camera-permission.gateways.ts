export interface CameraPermissionGateways {
  requestPermission(): Promise<boolean>;
  checkPermission(): Promise<boolean>;
}
