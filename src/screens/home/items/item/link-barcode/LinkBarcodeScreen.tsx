import { useEffect, useState } from 'react';
import { createLinkBarcodeScreenViewModel } from './link-barcode-screen.viewmodel';
import { ItemsStackScreenProps } from '../../../../../navigation/ItemsNavigation';
import { useAppDispatch } from '../../../../../store-hooks';
import Scanner from '../../../../../components/camera/scanner/Scanner';
import { useSelector } from 'react-redux';
import { Barcode } from '../../../../../core/scanner/hexagon/models/barcode';
import * as Haptics from 'expo-haptics';
import ThemedBottomSheet from '../../../../../components/bottom-sheet/ThemedBottomSheet';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Text, View } from 'react-native';
import { Portal } from '@gorhom/portal';
import { FullWindowOverlay } from 'react-native-screens';

export default function LinkBarcodeScreen({
  navigation,
  route: {
    params: { itemId },
  },
}: ItemsStackScreenProps<'LinkBarcode'>) {
  const dispatch = useAppDispatch();
  const [lastScannedBarcode, setLastScannedBarcode] = useState<
    Barcode | undefined
  >(undefined);
  const viewModel = useSelector(
    createLinkBarcodeScreenViewModel({
      itemId,
      setLastScannedBarcode,
      lastScannedBarcode,
      dispatch,
    }),
  );

  useEffect(() => {
    if (viewModel.type === 'success') {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      navigation.goBack();
    }
  }, [viewModel.type]);

  return (
    <>
      <Scanner onCodeScanned={viewModel.linkBarcode} />
      <Portal>
        <FullWindowOverlay>
          {viewModel.type === 'error' && <LinkError />}
        </FullWindowOverlay>
      </Portal>
    </>
  );
}

const LinkError = () => {
  useEffect(() => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, []);

  return (
    <ThemedBottomSheet snapPoints={['25%']} enablePanDownToClose>
      <BottomSheetView>
        <View className="p-4 pt-0">
          <Text className="text-xl font-bold dark:text-white">
            Already linked
          </Text>
          <Text className="text-neutral-400 dark:text-neutral-500">
            An item with this barcode is already linked
          </Text>
        </View>
      </BottomSheetView>
    </ThemedBottomSheet>
  );
};
