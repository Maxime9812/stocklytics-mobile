import {
  scanBarcodeUseCase,
  ScanBarcodeUseCasePayload,
} from '../../../core/scanner/hexagon/usecases/scan-barcode/scan-barcode.usecase';
import { createSelector } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../../core/create-store';

type CanScanBarcode = {
  scanBarcode: (payload: ScanBarcodeUseCasePayload) => Promise<void>;
};

export type ScanScreenViewModelStateLoading = { type: 'loading' };
export type ScanScreenViewModelStateNotFound = {
  type: 'not-found';
} & CanScanBarcode;
export type ScanScreenViewModelStateItemFound = {
  type: 'item-found';
  id: string;
} & CanScanBarcode;
export type ScanScreenViewModelStateIdle = { type: 'idle' } & CanScanBarcode;

export type ScanScreenViewModelState =
  | ScanScreenViewModelStateLoading
  | ScanScreenViewModelStateIdle
  | ScanScreenViewModelStateItemFound
  | ScanScreenViewModelStateNotFound;

type ScanScreenViewModelParams = {
  dispatch: AppDispatch;
};

export const createScanScreenViewModel = ({
  dispatch,
}: ScanScreenViewModelParams): ((
  state: RootState,
) => ScanScreenViewModelState) =>
  createSelector(
    [
      (state: RootState) => state.scanner.isLoading,
      (state: RootState) => state.scanner.scan,
    ],
    (isLoading, scan) => {
      const scanBarcode = async (payload: ScanBarcodeUseCasePayload) => {
        dispatch(scanBarcodeUseCase(payload));
      };

      if (isLoading) return { type: 'loading' };
      if (scan?.type == 'not-found') return { scanBarcode, type: 'not-found' };
      if (scan?.type == 'item')
        return { scanBarcode, type: 'item-found', id: scan.id };

      return { scanBarcode, type: 'idle' };
    },
  );
