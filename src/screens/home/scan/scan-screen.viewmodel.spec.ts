import { createTestStore } from '../../../core/create-store';
import {
  createScanScreenViewModel,
  ScanScreenViewModelStateIdle,
  ScanScreenViewModelStateItemFound,
} from './scan-screen.viewmodel';
import { scanBarcodeUseCase } from '../../../core/scanner/hexagon/usecases/scan-barcode/scan-barcode.usecase';
import { stateBuilder } from '../../../core/state-builder';

describe('ScanScreenViewModel', () => {
  test('Should call scanBarcodeUseCase when scanBarcode is called', async () => {
    const store = createTestStore();

    const viewModel = createScanScreenViewModel({
      dispatch: store.dispatch,
    })(store.getState());

    await (viewModel as ScanScreenViewModelStateIdle).scanBarcode({
      type: 'ean13',
      value: 'barcode-value',
    });

    expect(store.getDispatchedUseCaseArgs(scanBarcodeUseCase)).toEqual({
      type: 'ean13',
      value: 'barcode-value',
    });
  });

  test('Should be in idle state', () => {
    const state = stateBuilder().build();

    const viewModel = createScanScreenViewModel({
      dispatch: jest.fn,
    })(state);

    expect(viewModel.type).toEqual('idle');
  });

  test('Should be in loading state when scanning', () => {
    const state = stateBuilder().withScannerLoading().build();

    const viewModel = createScanScreenViewModel({
      dispatch: jest.fn,
    })(state);

    expect(viewModel.type).toEqual('loading');
  });

  test('Should be in not found state when barcode not found', () => {
    const state = stateBuilder().withScan({ type: 'not-found' }).build();

    const viewModel = createScanScreenViewModel({
      dispatch: jest.fn,
    })(state);

    expect(viewModel.type).toEqual('not-found');
  });

  test('Should be in item found state when barcode found with item', () => {
    const state = stateBuilder()
      .withScan({ type: 'item', id: 'item-id' })
      .build();

    const viewModel = createScanScreenViewModel({
      dispatch: jest.fn,
    })(state);

    expect(viewModel.type).toEqual('item-found');
  });

  test('Should have item id when barcode found with item', () => {
    const state = stateBuilder()
      .withScan({ type: 'item', id: 'item-id' })
      .build();

    const viewModel = createScanScreenViewModel({
      dispatch: jest.fn,
    })(state);

    expect((viewModel as ScanScreenViewModelStateItemFound).id).toEqual(
      'item-id',
    );
  });
});
