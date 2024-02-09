import { createCameraPermissionViewModel } from './camera-permission.viewmodel';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import BaseLayout from '../../layouts/BaseLayout';
import { Linking, Text, View } from 'react-native';
import Button from '../../buttons/Button';
import { exhaustiveGuard } from '../../../core/common/utils/exhaustive-guard';

export default function CameraPermission({ children }: PropsWithChildren) {
  const [hasPermission, setHasPermission] = useState<boolean | undefined>(
    undefined,
  );
  const viewModel = createCameraPermissionViewModel({
    hasPermission,
  });

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  console.log(viewModel.type);

  switch (viewModel.type) {
    case 'request-access':
      return <BaseLayout></BaseLayout>;
    case 'access-denied':
      return <AccessDenied />;
    case 'ready':
      return children;
    default:
      return exhaustiveGuard(viewModel);
  }
}

const AccessDenied = () => {
  const openSettings = () => {
    void Linking.openSettings();
  };

  return (
    <BaseLayout>
      <View className="flex-1 p-3 justify-between">
        <View className="space-y-2">
          <Text className="dark:text-white text-2xl font-bold">
            Camera access needed
          </Text>
          <Text className="text-neutral-500 dark:text-neutral-400">
            For use this feature, you need to grant access to camera
          </Text>
        </View>

        <Button onPress={openSettings}>
          <Button.Text>Grant Access</Button.Text>
        </Button>
      </View>
    </BaseLayout>
  );
};
