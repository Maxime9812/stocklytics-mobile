import { SafeAreaView, View } from 'react-native';
import { useState } from 'react';
import { BarCodeScanningResult, Camera, FlashMode } from 'expo-camera';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import Button from '../../../../components/buttons/Button';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import CameraPermission from '../../../../components/camera/camera-permission/CameraPermission';

export default function LinkBarcodeScreen({
  route: {
    params: { itemId },
  },
}: ItemsStackScreenProps<'LinkBarcode'>) {
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(FlashMode.off);

  const handleBarCodeScanned = ({ type, data }: BarCodeScanningResult) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <CameraPermission>
      <View className="flex-1">
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          autoFocus={10}
          useCamera2Api
          style={{ flex: 1 }}
          flashMode={torch}
        >
          <SafeAreaView>
            <View className="flex-row justify-end p-4">
              <Button
                variant="ghost"
                onPress={() =>
                  setTorch((torch) => {
                    return torch === FlashMode.off
                      ? FlashMode.torch
                      : FlashMode.off;
                  })
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
        </Camera>
      </View>
    </CameraPermission>
  );
}
