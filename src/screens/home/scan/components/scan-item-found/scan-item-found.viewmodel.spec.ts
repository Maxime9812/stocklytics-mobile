import { stateBuilder } from '../../../../../core/state-builder';
import { createScanItemFoundViewModel } from './scan-item-found.viewmodel';
import { itemBuilder } from '../../../../../core/items/__tests__/item.builder';

describe('ScanItemFoundViewModel', () => {
  it('Should be in loading state', () => {
    const state = stateBuilder().withLoadingItem(['item-id']).build();

    const viewModel = createScanItemFoundViewModel({
      id: 'item-id',
    })(state);

    expect(viewModel.type).toEqual('loading');
  });

  it('Should be in loading state when item not found', () => {
    const state = stateBuilder().build();

    const viewModel = createScanItemFoundViewModel({
      id: 'item-id',
    })(state);

    expect(viewModel.type).toEqual('loading');
  });

  it('Should be in loaded state', () => {
    const state = stateBuilder()
      .withItems([itemBuilder().withId('item-id').build()])
      .build();

    const viewModel = createScanItemFoundViewModel({
      id: 'item-id',
    })(state);

    expect(viewModel.type).toEqual('loaded');
  });

  it('Should have item data', () => {
    const state = stateBuilder()
      .withItems([
        itemBuilder()
          .withId('item-id')
          .withName('Iphone 13')
          .withQuantity(1)
          .withImage('image')
          .build(),
      ])
      .build();

    const viewModel = createScanItemFoundViewModel({
      id: 'item-id',
    })(state);

    expect(viewModel).toEqual(
      expect.objectContaining({
        item: {
          name: 'Iphone 13',
          imageUrl: 'image',
          quantity: 1,
        },
      }),
    );
  });
});
