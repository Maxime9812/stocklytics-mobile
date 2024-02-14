import { createAppAsyncThunk } from '../../../../create-app-async-thunk';
import { Barcode } from '../../../../scanner/hexagon/models/barcode';

export type LinkBarcodeToItemUseCasePayload = {
  itemId: string;
  barcode: Barcode;
};

export const linkBarcodeToItemUseCase = createAppAsyncThunk(
  'items/linkBarcode',
  async (
    payload: LinkBarcodeToItemUseCasePayload,
    { extra: { itemsGateway } },
  ) => {
    await itemsGateway.linkBarcode(payload);

    return payload;
  },
);
