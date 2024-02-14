import { SafeAreaView, View } from 'react-native';
import { useState } from 'react';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import Button from '../../../../components/buttons/Button';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { createLinkBarcodeScreenViewModel } from './link-barcode-screen.viewmodel';
import { useAppDispatch } from '../../../../store-hooks';
import {
  useCameraDevice,
  Camera,
  useCodeScanner,
} from 'react-native-vision-camera';
import CameraPermission from '../../../../components/camera/camera-permission/CameraPermission';

export default function LinkBarcodeScreen({
  navigation,
  route: {
    params: { itemId },
  },
}: ItemsStackScreenProps<'LinkBarcode'>) {
  const dispatch = useAppDispatch();
  const [hasScanned, setHasScanned] = useState(false);
  const [torchEnabled, setTorchEnabled] = useState(false);

  const onScannedSuccessfully = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.goBack();
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['code-128', 'ean-13', 'ean-8', 'qr'],
    onCodeScanned: async (codes) => {
      const { type, value = '' } = codes[0];
      await viewModel.scanBarcode({
        type,
        value,
      });
    },
  });

  const viewModel = createLinkBarcodeScreenViewModel({
    itemId,
    hasScanned,
    setHasScanned,
    dispatch,
    onScannedSuccessfully,
  });

  const device = useCameraDevice('back');

  if (device == null) return <View></View>;

  return (
    <CameraPermission>
      <View className="bg-white dark:bg-black flex-1">
        <Camera
          style={{ flex: 1 }}
          device={device}
          isActive={true}
          torch={torchEnabled ? 'on' : 'off'}
          codeScanner={codeScanner}
        >
          <ScanZone />
          <ContextMenu setTorch={setTorchEnabled} torch={torchEnabled} />
        </Camera>
      </View>
    </CameraPermission>
  );
}
type ContextMenuProps = {
  setTorch: (isEnabled: boolean) => void;
  torch: boolean;
};

const ContextMenu = ({ torch, setTorch }: ContextMenuProps) => {
  return (
    <SafeAreaView>
      <View className="flex-row justify-end p-4">
        <Button
          variant="ghost"
          onPress={() => setTorch(!torch)}
          className="p-4 rounded-full bg-neutral-300 dark:bg-neutral-800 opacity-70"
        >
          <Button.Icon>
            <Feather name={torch ? 'zap' : 'zap-off'} size={26} />
          </Button.Icon>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const ScanZone = () => {
  return (
    <View className="absolute h-screen w-screen justify-center p-8">
      <View className="border border-white rounded-xl h-64 w-full"></View>
    </View>
  );
};
