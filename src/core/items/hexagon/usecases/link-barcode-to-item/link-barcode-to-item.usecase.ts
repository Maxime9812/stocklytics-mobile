import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

type LinkBarcodeToItemUseCasePayload = {
  itemId: string;
  barcode: {
    type: string;
    value: string;
  };
};

export const linkBarcodeToItemUseCase = createAppAsyncThunk(
  'items/linkBarcode',
  async ({}: LinkBarcodeToItemUseCasePayload) => {},
);
