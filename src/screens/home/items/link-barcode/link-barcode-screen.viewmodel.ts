import { AppDispatch } from '../../../../core/create-store';
import { linkBarcodeToItemUseCase } from '../../../../core/items/hexagon/usecases/link-barcode-to-item/link-barcode-to-item.usecase';

export type LinkBarcodeScreenViewModelParams = {
  itemId: string;
  dispatch: AppDispatch;
  hasScanned: boolean;
  setHasScanned: (value: boolean) => void;
  onScannedSuccessfully: (barcode: { type: string; value: string }) => void;
};

export const createLinkBarcodeScreenViewModel = ({
  onScannedSuccessfully,
  dispatch,
  hasScanned,
  setHasScanned,
  itemId,
}: LinkBarcodeScreenViewModelParams) => {
  const scanBarcode = async (barcode: { type: string; value: string }) => {
    if (hasScanned) return;
    onScannedSuccessfully(barcode);
    setHasScanned(true);
    return dispatch(linkBarcodeToItemUseCase({ itemId, barcode }));
  };

  return {
    scanBarcode,
  };
};
