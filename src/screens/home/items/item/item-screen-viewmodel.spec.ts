import { createItemScreenViewModel } from './item-screen-viewmodel';
import { stateBuilder } from '../../../../core/state-builder';
import { itemBuilder } from '../../../../core/items/__tests__/item.builder';

describe('ItemScreenViewModel', () => {
  it('Should be in error state when item is not found', () => {
    const viewModel = createItemScreenViewModel({
      itemId: 'item-id',
    })(stateBuilder().build());

    expect(viewModel).toEqual(
      expect.objectContaining({
        type: 'loading',
      }),
    );
  });

  it('Should be in loaded state when item is found', () => {
    const state = stateBuilder()
      .withItems([itemBuilder().withId('item-id').build()])
      .build();

    const viewModel = createItemScreenViewModel({
      itemId: 'item-id',
    })(state);

    expect(viewModel).toEqual(
      expect.objectContaining({
        type: 'loaded',
      }),
    );
  });

  it('Should return item infos', () => {
    const state = stateBuilder()
      .withItems([
        itemBuilder()
          .withId('item-id')
          .withName('item-name')
          .withQuantity(10)
          .withNote('This is a note')
          .createdAt(new Date('2024-01-01'))
          .build(),
      ])
      .build();

    const viewModel = createItemScreenViewModel({
      itemId: 'item-id',
    })(state);

    expect(viewModel).toEqual(
      expect.objectContaining({
        item: expect.objectContaining({
          id: 'item-id',
          name: 'item-name',
          quantity: 10,
          note: 'This is a note',
          createdAt: new Date('2024-01-01'),
        }),
      }),
    );
  });

  describe('Item has note', () => {
    it('Should return false when note is empty', () => {
      const state = stateBuilder()
        .withItems([itemBuilder().withId('item-id').withNote('').build()])
        .build();

      const viewModel = createItemScreenViewModel({
        itemId: 'item-id',
      })(state);

      expect(viewModel).toEqual(
        expect.objectContaining({
          item: expect.objectContaining({
            hasNote: false,
          }),
        }),
      );
    });
    it('Should return true when note is NOT empty', () => {
      const state = stateBuilder()
        .withItems([
          itemBuilder().withId('item-id').withNote('This is a note').build(),
        ])
        .build();

      const viewModel = createItemScreenViewModel({
        itemId: 'item-id',
      })(state);

      expect(viewModel).toEqual(
        expect.objectContaining({
          item: expect.objectContaining({
            hasNote: true,
          }),
        }),
      );
    });
  });
});
