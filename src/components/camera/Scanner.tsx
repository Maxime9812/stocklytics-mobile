import CameraPermission from './camera-permission/CameraPermission';
import { SafeAreaView, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import Button from '../buttons/Button';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { CodeScanner } from 'react-native-vision-camera/src/CodeScanner';

type ScannerProps = {
  isActive?: boolean;
  onCodeScanned: CodeScanner['onCodeScanned'];
};

export default function Scanner({
  onCodeScanned,
  isActive = true,
}: ScannerProps) {
  const [torchEnabled, setTorchEnabled] = useState(false);
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['code-128', 'ean-13', 'ean-8'],
    onCodeScanned: onCodeScanned,
  });

  useEffect(() => {
    setTorchEnabled(false);
  }, [isActive]);

  if (device == null) return <View></View>;

  return (
    <CameraPermission>
      <View className="bg-white dark:bg-black flex-1">
        <Camera
          style={{ flex: 1 }}
          device={device}
          isActive={isActive}
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
