export interface MediaLibraryPermissionGateway {
  checkPermission(): Promise<boolean>;
  requestPermission(): Promise<boolean>;
}
