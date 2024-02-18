import { Linking, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { createMediaLibraryPermissionViewModel } from './media-library-permission.viewmodel';
import { useAppDispatch } from '../../store-hooks';
import { exhaustiveGuard } from '../../core/common/utils/exhaustive-guard';
import { ReactNode, useEffect } from 'react';
import BaseLayout from '../layouts/BaseLayout';
import Button from '../buttons/Button';

type Props = {
  accessDenied?: ReactNode;
  alwaysRender?: boolean;
  children: ReactNode | ((hasPermission: boolean) => ReactNode);
};
export const MediaLibraryPermission = ({
  children,
  accessDenied = <AccessDenied />,
  alwaysRender = false,
}: Props) => {
  const dispatch = useAppDispatch();
  const viewModel = useSelector(
    createMediaLibraryPermissionViewModel({ dispatch, alwaysRender }),
  );

  useEffect(() => {
    if (viewModel.type === 'access-denied') {
      void viewModel.requestAccess();
    }
  }, [viewModel]);
  switch (viewModel.type) {
    case 'access-denied':
      return accessDenied;
    case 'ready':
      return typeof children == 'function'
        ? children(viewModel.hasPermission)
        : children;
    default:
      return exhaustiveGuard(viewModel);
  }
};

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
