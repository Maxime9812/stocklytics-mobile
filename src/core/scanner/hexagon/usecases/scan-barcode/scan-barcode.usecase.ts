import { createAppAsyncThunk } from '../../../../create-app-async-thunk';
import { Barcode } from '../../models/barcode';

export type ScanBarcodeUseCasePayload = Barcode;

export const scanBarcodeUseCase = createAppAsyncThunk(
  'scanner/scanBarcode',
  async (payload: ScanBarcodeUseCasePayload, { extra: { scannerGateway } }) => {
    return scannerGateway.scan(payload);
  },
);
