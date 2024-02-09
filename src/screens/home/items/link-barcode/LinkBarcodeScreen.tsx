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
    codeTypes: [
      'code-128',
      'code-39',
      'code-93',
      'codabar',
      'ean-13',
      'ean-8',
      'itf',
      'upc-e',
      'qr',
      'pdf-417',
      'aztec',
      'data-matrix',
    ],
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

  const handleBarCodeScanned = async ({ type, data }: any) => {
    console.log('Scanned', data, type);
    await viewModel.scanBarcode({
      type,
      value: data,
    });
  };

  const device = useCameraDevice('back');

  if (device == null) return <View></View>;

  return (
    <Camera
      style={{ flex: 1 }}
      device={device}
      isActive={true}
      torch={torchEnabled ? 'on' : 'off'}
      codeScanner={codeScanner}
    >
      <ContextMenu setTorch={setTorchEnabled} torch={torchEnabled} />
    </Camera>
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
