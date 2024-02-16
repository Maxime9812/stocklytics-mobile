import { CameraPermissionGateways } from '../../../hexagon/gateways/camera-permission.gateways';
import { Camera } from 'react-native-vision-camera';
export class CameraVisionPermissionGateway implements CameraPermissionGateways {
  async checkPermission(): Promise<boolean> {
    const permission = Camera.getCameraPermissionStatus();
    return permission === 'granted';
  }

  async requestPermission(): Promise<boolean> {
    const permission = await Camera.requestCameraPermission();
    return permission === 'granted';
  }
}
