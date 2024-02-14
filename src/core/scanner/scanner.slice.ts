import { createSlice } from '@reduxjs/toolkit';
import { Scan } from './hexagon/models/Scan';
import { scanBarcodeUseCase } from './hexagon/usecases/scan-barcode/scan-barcode.usecase';

type ScannerSliceState = {
  scan?: Scan;
};

const initialState: ScannerSliceState = {};

export const scannerSlice = createSlice({
  name: 'scanner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(scanBarcodeUseCase.fulfilled, (state, action) => {
      state.scan = action.payload;
    });
  },
});
