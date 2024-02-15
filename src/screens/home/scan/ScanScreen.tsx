import React, { useEffect, useState } from 'react';
import { HomeTabScreenProps } from '../../../navigation/HomeNavigation';
import Scanner from '../../../components/camera/scanner/Scanner';
import { Portal } from '@gorhom/portal';
import ThemedBottomSheet from '../../../components/bottom-sheet/ThemedBottomSheet';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Text, View } from 'react-native';
import { createScanScreenViewModel } from './scan-screen.viewmodel';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store-hooks';
import { Barcode } from '../../../core/scanner/hexagon/models/barcode';
import * as Haptics from 'expo-haptics';

export default function ScanScreen({ navigation }: HomeTabScreenProps<'Scan'>) {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState(true);
  const viewModel = useSelector(createScanScreenViewModel({ dispatch }));

  useEffect(() => {
    return navigation.addListener('focus', () => {
      setIsActive(true);
    });
  }, []);

  useEffect(() => {
    return navigation.addListener('blur', () => {
      setIsActive(false);
    });
  }, []);

  const handleCodeScanned = async (code: Barcode) => {
    if (viewModel.type == 'loading') return;
    await viewModel.scanBarcode(code);
  };

  return (
    <>
      <Scanner onCodeScanned={handleCodeScanned} isActive={isActive} />
      <Portal>
        {viewModel.type === 'not-found' && <NotFoundView />}
        {viewModel.type == 'item-found' && <ItemFoundView id={viewModel.id} />}
      </Portal>
    </>
  );
}

const NotFoundView = () => {
  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, []);
  return (
    <ThemedBottomSheet snapPoints={['30%', '30%']} enablePanDownToClose>
      <BottomSheetView>
        <View>
          <Text className="dark:text-white">Barcode not found</Text>
        </View>
      </BottomSheetView>
    </ThemedBottomSheet>
  );
};

type ItemFoundViewProps = {
  id: string;
};

const ItemFoundView = ({ id }: ItemFoundViewProps) => {
  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);
  return (
    <ThemedBottomSheet snapPoints={['30%', '30%']} enablePanDownToClose>
      <BottomSheetView>
        <View>
          <Text className="dark:text-white">Item found {id}</Text>
        </View>
      </BottomSheetView>
    </ThemedBottomSheet>
  );
};
