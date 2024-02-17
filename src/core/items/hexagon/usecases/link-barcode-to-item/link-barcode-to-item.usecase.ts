import { createAppAsyncThunk } from '../../../../create-app-async-thunk';
import { Barcode } from '../../../../scanner/hexagon/models/barcode';
import { createAction } from '@reduxjs/toolkit';
import { LinkBarcodeError } from '../../gateways/items.gateway';
import { isLeft } from 'fp-ts/Either';

export type LinkBarcodeToItemUseCasePayload = {
  itemId: string;
  barcode: Barcode;
};

export const linkBarcodeToItemError = createAction<{
  itemId: string;
  error: LinkBarcodeError;
}>('items/linkBarcode/error');

export const linkBarcodeToItemUseCase = createAppAsyncThunk(
  'items/linkBarcode',
  async (
    payload: LinkBarcodeToItemUseCasePayload,
    { extra: { itemsGateway }, dispatch },
  ) => {
    const result = await itemsGateway.linkBarcode(payload);
    if (isLeft(result)) {
      throw dispatch(
        linkBarcodeToItemError({ itemId: payload.itemId, error: result.left }),
      );
    }
    return payload;
  },
);
