import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';
import { View } from 'react-native';

export const MediaLibraryPermission = () => {
  const [permissionResponse, requestPermission] =
    ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    const getMediaPermissions = async () => {
      await requestPermission();
    };

    getMediaPermissions();
  }, []);

  return <View></View>;
};
