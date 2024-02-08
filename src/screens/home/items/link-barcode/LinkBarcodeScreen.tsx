import { SafeAreaView, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { BarCodeScanningResult, Camera, FlashMode } from 'expo-camera';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import Button from '../../../../components/buttons/Button';
import { Feather } from '@expo/vector-icons';

export default function LinkBarcodeScreen({
  navigation,
}: ItemsStackScreenProps<'LinkBarcode'>) {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(FlashMode.off);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarCodeScanningResult) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View className="flex-1 bg-transparent">
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        autoFocus={10}
        useCamera2Api
        style={{ flex: 1 }}
        flashMode={torch}
      >
        <SafeAreaView>
          <View className="flex-row justify-end p-3">
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
  );
}
