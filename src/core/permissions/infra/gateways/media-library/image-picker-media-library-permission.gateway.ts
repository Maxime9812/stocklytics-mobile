import { MediaLibraryPermissionGateway } from '../../../hexagon/gateways/media-library-permission.gateway';
import * as ImagePicker from 'expo-image-picker';
export class ImagePickerMediaLibraryPermissionGateway
  implements MediaLibraryPermissionGateway
{
  async checkPermission() {
    const hasPermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    return hasPermission.granted;
  }

  async requestPermission() {
    const hasPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    return hasPermission.granted;
  }
}
