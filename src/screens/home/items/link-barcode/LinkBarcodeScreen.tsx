import { SafeAreaView, View } from 'react-native';
import { useState } from 'react';
import { BarCodeScanningResult, Camera, FlashMode } from 'expo-camera';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import Button from '../../../../components/buttons/Button';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import CameraPermission from '../../../../components/camera/camera-permission/CameraPermission';
import { createLinkBarcodeScreenViewModel } from './link-barcode-screen.viewmodel';
import { useAppDispatch } from '../../../../store-hooks';

export default function LinkBarcodeScreen({
  navigation,
  route: {
    params: { itemId },
  },
}: ItemsStackScreenProps<'LinkBarcode'>) {
  const dispatch = useAppDispatch();
  const [hasScanned, setHasScanned] = useState(false);
  const [torch, setTorch] = useState(FlashMode.off);

  const onScannedSuccessfully = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.goBack();
  };

  const viewModel = createLinkBarcodeScreenViewModel({
    itemId,
    hasScanned,
    setHasScanned,
    dispatch,
    onScannedSuccessfully,
  });

  const handleBarCodeScanned = async ({
    type,
    data,
  }: BarCodeScanningResult) => {
    await viewModel.scanBarcode({
      type,
      value: data,
    });
  };

  return (
    <CameraPermission>
      <View className="flex-1">
        <Camera
          onBarCodeScanned={handleBarCodeScanned}
          autoFocus={10}
          useCamera2Api
          style={{ flex: 1 }}
          flashMode={torch}
        >
          <ContextMenu torch={torch} setTorch={setTorch} />
        </Camera>
      </View>
    </CameraPermission>
  );
}

type ContextMenuProps = {
  setTorch: (torch: FlashMode) => void;
  torch: FlashMode;
};

const ContextMenu = ({ torch, setTorch }: ContextMenuProps) => {
  return (
    <SafeAreaView>
      <View className="flex-row justify-end p-4">
        <Button
          variant="ghost"
          onPress={() =>
            setTorch(torch === FlashMode.off ? FlashMode.torch : FlashMode.off)
          }
          className="p-4 rounded-full bg-neutral-300 dark:bg-neutral-800 opacity-70"
        >
          <Button.Icon>
            <Feather
              name={torch == FlashMode.torch ? 'zap' : 'zap-off'}
              size={26}
            />
          </Button.Icon>
        </Button>
      </View>
    </SafeAreaView>
  );
};
