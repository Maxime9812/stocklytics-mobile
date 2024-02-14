import { useState } from 'react';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import * as Haptics from 'expo-haptics';
import { createLinkBarcodeScreenViewModel } from './link-barcode-screen.viewmodel';
import { useAppDispatch } from '../../../../store-hooks';
import Scanner from '../../../../components/camera/Scanner';

export default function LinkBarcodeScreen({
  navigation,
  route: {
    params: { itemId },
  },
}: ItemsStackScreenProps<'LinkBarcode'>) {
  const dispatch = useAppDispatch();
  const [hasScanned, setHasScanned] = useState(false);

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

  return <Scanner onCodeScanned={viewModel.scanBarcode} />;
}
