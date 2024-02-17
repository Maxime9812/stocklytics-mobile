import { createLinkBarcodeScreenViewModel } from './link-barcode-screen.viewmodel';
import { createTestStore } from '../../../../../core/create-store';
import { linkBarcodeToItemUseCase } from '../../../../../core/items/hexagon/usecases/link-barcode-to-item/link-barcode-to-item.usecase';

describe('LinkBarcodeScreenViewModel', () => {
  it('should call linkBarcodeToItemUseCase when call scanBarcode', async () => {
    const store = createTestStore();
    const { scanBarcode } = createLinkBarcodeScreenViewModel({
      itemId: 'item-id',
      hasScanned: false,
      setHasScanned: jest.fn(),
      dispatch: store.dispatch,
      onScannedSuccessfully: jest.fn(),
    });

    await scanBarcode({ type: 'qr', value: 'barcode' });

    expect(store.getDispatchedUseCaseArgs(linkBarcodeToItemUseCase)).toEqual({
      itemId: 'item-id',
      barcode: { type: 'qr', value: 'barcode' },
    });
  });
  it('should call onScannedSuccessfully when call scanBarcode', async () => {
    let barcode;
    const onScannedSuccessfully = (_barcode: {
      type: string;
      value: string;
    }) => {
      barcode = _barcode;
    };
    const { scanBarcode } = createLinkBarcodeScreenViewModel({
      itemId: 'item-id',
      hasScanned: false,
      setHasScanned: jest.fn(),
      dispatch: jest.fn(),
      onScannedSuccessfully,
    });

    await scanBarcode({ type: 'qr', value: 'barcode' });

    expect(barcode).toEqual({ type: 'qr', value: 'barcode' });
  });

  it('Should call setHasScanned when call scanBarcode', async () => {
    let hasScanned = false;
    const setHasScanned = (value: boolean) => {
      hasScanned = value;
    };
    const { scanBarcode } = createLinkBarcodeScreenViewModel({
      itemId: 'item-id',
      hasScanned,
      setHasScanned,
      dispatch: jest.fn(),
      onScannedSuccessfully: jest.fn(),
    });

    await scanBarcode({ type: 'qr', value: 'barcode' });

    expect(hasScanned).toEqual(true);
  });

  it('Can NOT scan if already scanned', async () => {
    const store = createTestStore();
    const { scanBarcode } = createLinkBarcodeScreenViewModel({
      itemId: 'item-id',
      hasScanned: true,
      setHasScanned: jest.fn(),
      dispatch: store.dispatch,
      onScannedSuccessfully: jest.fn(),
    });

    await scanBarcode({ type: 'qr', value: 'barcode' });

    expect(store.getDispatchedUseCaseArgs(linkBarcodeToItemUseCase)).toEqual(
      undefined,
    );
  });
});
