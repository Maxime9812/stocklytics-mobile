import React, { useEffect, useState } from 'react';
import { HomeTabScreenProps } from '../../../navigation/HomeNavigation';
import Scanner from '../../../components/camera/scanner/Scanner';
import { Portal } from '@gorhom/portal';
import { createScanScreenViewModel } from './scan-screen.viewmodel';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store-hooks';
import { Barcode } from '../../../core/scanner/hexagon/models/barcode';
import ScanNotFound from './components/ScanNotFound';
import ScanItemFound from './components/scan-item-found/ScanItemFound';

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
        {viewModel.type === 'not-found' && <ScanNotFound />}
        {viewModel.type == 'item-found' && (
          <ScanItemFound id={viewModel.id} navigation={navigation} />
        )}
      </Portal>
    </>
  );
}
