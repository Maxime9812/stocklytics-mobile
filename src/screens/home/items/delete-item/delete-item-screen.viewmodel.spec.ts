import { createTestStore } from '../../../../core/create-store';
import { createDeleteItemScreenViewModel } from './delete-item-screen.viewmodel';
import { deleteItemUseCase } from '../../../../core/items/hexagon/usecases/delete-item/delete-item.usecase';
import { stateBuilder } from '../../../../core/state-builder';
import { itemBuilder } from '../../../../core/items/__tests__/item.builder';

describe('DeleteItemScreenViewModel', () => {
  it('Should call deleteItemUseCase when call deleteItem', async () => {
    const store = createTestStore();
    const { deleteItem } = createDeleteItemScreenViewModel({
      itemId: 'item-id',
      dispatch: store.dispatch,
    })(store.getState());

    await deleteItem();

    expect(store.getDispatchedUseCaseArgs(deleteItemUseCase)).toEqual({
      itemId: 'item-id',
    });
  });

  it('Should return item', () => {
    const state = stateBuilder()
      .withItems([
        itemBuilder().withId('item-id').withName('Iphone 13 pro max').build(),
      ])
      .build();
    const { item } = createDeleteItemScreenViewModel({
      itemId: 'item-id',
      dispatch: jest.fn(),
    })(state);

    expect(item).toEqual({
      name: 'Iphone 13 pro max',
    });
  });
});
