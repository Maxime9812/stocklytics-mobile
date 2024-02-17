import { stateBuilder } from '../../../../../core/state-builder';
import {
  createLinkBarcodeScreenViewModel,
  LinkBarcodeScreenViewModelStateIdle,
} from './link-barcode-screen.viewmodel';
import { createTestStore } from '../../../../../core/create-store';
import { linkBarcodeToItemUseCase } from '../../../../../core/items/hexagon/usecases/link-barcode-to-item/link-barcode-to-item.usecase';
import { itemBuilder } from '../../../../../core/items/__tests__/item.builder';
import { Barcode } from '../../../../../core/scanner/hexagon/models/barcode';

describe('LinkBarcodeScreenViewModel', () => {
  it('Should be in loading state when barcode is linking', () => {
    const state = stateBuilder().withLinkingBarcodeToItem('item-id').build();
    const viewModel = createLinkBarcodeScreenViewModel({
      dispatch: jest.fn(),
      setLastScannedBarcode: jest.fn(),
      itemId: 'item-id',
    })(state);

    expect(viewModel.type).toEqual('loading');
  });

  it('Should be in error state when linking has error', () => {
    const state = stateBuilder()
      .withLinkBarcodeToItemError({
        itemId: 'item-id',
        error: {
          type: 'BarcodeAlreadyLinkedToAnotherItemError',
          itemId: 'another-item-id',
        },
      })
      .withItems([itemBuilder().withId('item-id').build()])
      .build();
    const viewModel = createLinkBarcodeScreenViewModel({
      dispatch: jest.fn(),
      lastScannedBarcode: {
        type: 'ean13',
        value: '1234567890123',
      },
      setLastScannedBarcode: jest.fn(),
      itemId: 'item-id',
    })(state);

    expect(viewModel).toEqual(
      expect.objectContaining({
        type: 'error',
        error: {
          type: 'BarcodeAlreadyLinkedToAnotherItemError',
          itemId: 'another-item-id',
        },
      }),
    );
  });

  it('Should be in success state when barcode is linked', () => {
    const state = stateBuilder()
      .withItems([
        itemBuilder()
          .withBarcode({
            type: 'ean13',
            value: '1234567890123',
          })
          .build(),
      ])
      .build();
    const viewModel = createLinkBarcodeScreenViewModel({
      dispatch: jest.fn(),
      lastScannedBarcode: {
        type: 'ean13',
        value: '1234567890123',
      },
      setLastScannedBarcode: jest.fn(),
      itemId: 'item-id',
    })(state);

    expect(viewModel.type).toEqual('success');
  });

  it('Should be in idle state when error was a previous one', () => {
    const state = stateBuilder()
      .withLinkBarcodeToItemError({
        itemId: 'item-id',
        error: {
          type: 'BarcodeAlreadyLinkedToAnotherItemError',
          itemId: 'another-item-id',
        },
      })
      .build();
    const viewModel = createLinkBarcodeScreenViewModel({
      dispatch: jest.fn(),
      setLastScannedBarcode: jest.fn(),
      itemId: 'item-id',
    })(state);

    expect(viewModel.type).toEqual('idle');
  });

  it('Should be in idle state', () => {
    const state = stateBuilder()
      .withItems([itemBuilder().withId('item-id').build()])
      .build();
    const viewModel = createLinkBarcodeScreenViewModel({
      dispatch: jest.fn(),
      setLastScannedBarcode: jest.fn(),
      itemId: 'item-id',
    })(state);

    expect(viewModel.type).toEqual('idle');
  });

  it('Should call linkBarcodeUseCase when call linkBarcode', async () => {
    const store = createTestStore();

    const viewModel = createLinkBarcodeScreenViewModel({
      dispatch: store.dispatch,
      setLastScannedBarcode: jest.fn(),
      itemId: 'item-id',
    })(store.getState());

    await (viewModel as LinkBarcodeScreenViewModelStateIdle).linkBarcode({
      type: 'ean13',
      value: '1234567890123',
    });
    expect(store.getDispatchedUseCaseArgs(linkBarcodeToItemUseCase)).toEqual({
      itemId: 'item-id',
      barcode: {
        type: 'ean13',
        value: '1234567890123',
      },
    });
  });

  it('Should call setLastScannedBarcode when call linkBarcode', async () => {
    const state = stateBuilder()
      .withItems([itemBuilder().withId('item-id').build()])
      .build();

    let lastScannedBarcode: Barcode | undefined;
    const setLastScannedBarcode = (value: Barcode) => {
      lastScannedBarcode = value;
    };
    const { linkBarcode } = createLinkBarcodeScreenViewModel({
      dispatch: jest.fn(),
      lastScannedBarcode,
      setLastScannedBarcode,
      itemId: 'item-id',
    })(state);

    await linkBarcode({
      type: 'ean13',
      value: '1234567890123',
    });
    expect(lastScannedBarcode).toEqual({
      type: 'ean13',
      value: '1234567890123',
    });
  });
});
