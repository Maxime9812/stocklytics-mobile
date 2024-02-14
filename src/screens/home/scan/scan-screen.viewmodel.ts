import {
  scanBarcodeUseCase,
  ScanBarcodeUseCasePayload,
} from '../../../core/scanner/hexagon/usecases/scan-barcode/scan-barcode.usecase';
import { createSelector } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../../core/create-store';

export type ScanScreenViewModelState = {
  scanBarcode: (payload: ScanBarcodeUseCasePayload) => Promise<void>;
};

type ScanScreenViewModelParams = {
  dispatch: AppDispatch;
};

export const createScanScreenViewModel = ({
  dispatch,
}: ScanScreenViewModelParams): ((
  state: RootState,
) => ScanScreenViewModelState) =>
  createSelector([(state: RootState) => {}], () => {
    const scanBarcode = async (payload: ScanBarcodeUseCasePayload) => {
      dispatch(scanBarcodeUseCase(payload));
    };
    return { scanBarcode };
  });
