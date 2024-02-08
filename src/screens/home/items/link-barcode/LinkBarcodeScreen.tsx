import { Text } from 'react-native';
import { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import { BarCodeScanningResult } from 'expo-camera';
export default function LinkBarcodeScreen({
  navigation,
}: ItemsStackScreenProps<'LinkBarcode'>) {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
    bounds,
  }: BarCodeScanningResult) => {
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
    <Camera
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      autoFocus={10}
      useCamera2Api
      style={{ flex: 1 }}
    />
  );
}
