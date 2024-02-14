import React, { useEffect, useState } from 'react';
import { HomeTabScreenProps } from '../../../navigation/HomeNavigation';
import Scanner from '../../../components/camera/Scanner';
import { Portal } from '@gorhom/portal';
import ThemedBottomSheet from '../../../components/bottom-sheet/ThemedBottomSheet';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { View } from 'react-native';

export default function ScanScreen({ navigation }: HomeTabScreenProps<'Scan'>) {
  const [isActive, setIsActive] = useState(true);

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

  return (
    <>
      <Scanner onCodeScanned={() => {}} isActive={isActive} />
      <Portal>
        <ThemedBottomSheet snapPoints={['30%', '30%']} enablePanDownToClose>
          <BottomSheetView>
            <View></View>
          </BottomSheetView>
        </ThemedBottomSheet>
      </Portal>
    </>
  );
}
