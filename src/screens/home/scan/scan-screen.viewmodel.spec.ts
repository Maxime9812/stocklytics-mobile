import { createTestStore } from '../../../core/create-store';
import { createScanScreenViewModel } from './scan-screen.viewmodel';
import { scanBarcodeUseCase } from '../../../core/scanner/hexagon/usecases/scan-barcode/scan-barcode.usecase';

describe('ScanScreenViewModel', () => {
  test('Should call scanBarcodeUseCase when scanBarcode is called', async () => {
    const store = createTestStore();

    const { scanBarcode } = createScanScreenViewModel({
      dispatch: store.dispatch,
    })(store.getState());

    await scanBarcode({ type: 'ean13', value: 'barcode-value' });

    expect(store.getDispatchedUseCaseArgs(scanBarcodeUseCase)).toEqual({
      type: 'ean13',
      value: 'barcode-value',
    });
  });
});
