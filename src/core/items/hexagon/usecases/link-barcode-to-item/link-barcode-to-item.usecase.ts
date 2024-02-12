import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type LinkBarcodeToItemUseCasePayload = {
  itemId: string;
  barcode: {
    type: string;
    value: string;
  };
};

export const linkBarcodeToItemUseCase = createAppAsyncThunk(
  'items/linkBarcode',
  async (
    { itemId, barcode }: LinkBarcodeToItemUseCasePayload,
    { extra: { itemsGateway, barcodeTypeProvider }, rejectWithValue },
  ) => {
    const barcodeType = barcodeTypeProvider.getBarcodeType(barcode.type);

    if (barcodeType === 'unsupported') {
      return rejectWithValue('Unsupported barcode type');
    }

    const payload = {
      itemId,
      barcode: {
        type: barcodeType,
        value: barcode.value,
      },
    };
    await itemsGateway.linkBarcode(payload);

    return payload;
  },
);
