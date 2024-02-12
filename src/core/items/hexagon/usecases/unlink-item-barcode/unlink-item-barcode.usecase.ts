import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export const unlinkItemBarcodeUseCase = createAppAsyncThunk(
  'items/unlinkBarcode',
  async (itemId: string, { extra: { itemsGateway } }) => {
    await itemsGateway.unlinkBarcode(itemId);
  },
);
