import { AppDispatch, RootState } from '../../../../../core/create-store';
import { LinkBarcodeError } from '../../../../../core/items/hexagon/gateways/items.gateway';
import { createSelector } from '@reduxjs/toolkit';
import { Barcode } from '../../../../../core/scanner/hexagon/models/barcode';
import { linkBarcodeToItemUseCase } from '../../../../../core/items/hexagon/usecases/link-barcode-to-item/link-barcode-to-item.usecase';
import { selectItemById } from '../../../../../core/items/items.slice';

export type LinkBarcodeScreenViewModelParams = {
  itemId: string;
  dispatch: AppDispatch;
  setLastScannedBarcode: (value: Barcode) => void;
  lastScannedBarcode?: Barcode;
};

type LinkBarcodeScreenViewModelStateLoading = {
  type: 'loading';
};
export type LinkBarcodeScreenViewModelStateIdle = {
  type: 'idle';
  linkBarcode: (barcode: Barcode) => Promise<void>;
};
type LinkBarcodeScreenViewModelStateError = {
  type: 'error';
  error: LinkBarcodeError;
};
type LinkBarcodeScreenViewModelStateSuccess = {
  type: 'success';
};

export type LinkBarcodeScreenViewModelState = {
  linkBarcode: (barcode: Barcode) => Promise<void>;
} & (
  | LinkBarcodeScreenViewModelStateLoading
  | LinkBarcodeScreenViewModelStateError
  | LinkBarcodeScreenViewModelStateSuccess
  | LinkBarcodeScreenViewModelStateIdle
);

export const createLinkBarcodeScreenViewModel = ({
  dispatch,
  lastScannedBarcode,
  setLastScannedBarcode,
  itemId,
}: LinkBarcodeScreenViewModelParams): ((
  state: RootState,
) => LinkBarcodeScreenViewModelState) =>
  createSelector(
    [
      (state: RootState) => state.items.linkBarcodeErrors[itemId],
      (state: RootState) => state.items.isLinkingBarcode[itemId],
      selectItemById(itemId),
    ],
    (error, isLoading, item) => {
      const linkBarcode = async (barcode: Barcode) => {
        await dispatch(linkBarcodeToItemUseCase({ itemId, barcode }));
        setLastScannedBarcode(barcode);
      };
      if (isLoading) {
        return { type: 'loading', linkBarcode };
      }
      const isLinked =
        lastScannedBarcode &&
        item.barcode?.type === lastScannedBarcode.type &&
        item.barcode?.value === lastScannedBarcode.value;

      if (isLinked) {
        return { type: 'success', linkBarcode };
      }

      if (error && lastScannedBarcode) {
        return { type: 'error', error, linkBarcode };
      }

      return {
        type: 'idle',
        linkBarcode,
      };
    },
  );
