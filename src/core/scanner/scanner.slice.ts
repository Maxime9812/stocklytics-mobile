import { createSlice } from '@reduxjs/toolkit';
import { Scan } from './hexagon/models/Scan';
import { scanBarcodeUseCase } from './hexagon/usecases/scan-barcode/scan-barcode.usecase';

type ScannerSliceState = {
  scan?: Scan | null;
  isLoading: boolean;
};

const initialState: ScannerSliceState = {
  isLoading: false,
  scan: null,
};

export const scannerSlice = createSlice({
  name: 'scanner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(scanBarcodeUseCase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(scanBarcodeUseCase.fulfilled, (state, action) => {
        state.scan = action.payload;
        state.isLoading = false;
      })
      .addCase(scanBarcodeUseCase.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
