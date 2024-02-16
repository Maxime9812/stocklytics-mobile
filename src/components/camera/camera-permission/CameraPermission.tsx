import { createCameraPermissionViewModel } from './camera-permission.viewmodel';
import { PropsWithChildren, ReactNode, useEffect } from 'react';
import BaseLayout from '../../layouts/BaseLayout';
import { Linking, Text, View } from 'react-native';
import Button from '../../buttons/Button';
import { exhaustiveGuard } from '../../../core/common/utils/exhaustive-guard';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store-hooks';

type Props = PropsWithChildren<{
  accessDenied?: ReactNode;
}>;

export default function CameraPermission({
  children,
  accessDenied = <AccessDenied />,
}: Props) {
  const dispatch = useAppDispatch();
  const viewModel = useSelector(createCameraPermissionViewModel({ dispatch }));

  useEffect(() => {
    if (viewModel.type === 'access-denied') {
      void viewModel.requestAccess();
    }
  }, [viewModel]);

  switch (viewModel.type) {
    case 'access-denied':
      return accessDenied;
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
