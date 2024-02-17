import { createTestStore } from '../../../../../core/create-store';
import { createEditItemNameScreenViewModel } from './edit-item-name-screen.viewmodel';
import { editItemNameUseCase } from '../../../../../core/items/hexagon/usecases/edit-item-name/edit-item-name.usecase';
import { stateBuilder } from '../../../../../core/state-builder';
import { itemBuilder } from '../../../../../core/items/__tests__/item.builder';

describe('Edit Item Name Screen View Model', () => {
  it('Should call editItemName use case with correct params when call editName', async () => {
    const store = createTestStore();
    const { editName } = createEditItemNameScreenViewModel({
      itemId: 'item-id',
      dispatch: store.dispatch,
    })(store.getState());

    await editName('new name');

    expect(store.getDispatchedUseCaseArgs(editItemNameUseCase)).toEqual({
      itemId: 'item-id',
      name: 'new name',
    });
  });

  it('Should have item name', async () => {
    const state = stateBuilder()
      .withItems([
        itemBuilder().withId('item-id').withName('item name').build(),
      ])
      .build();

    const { name } = createEditItemNameScreenViewModel({
      itemId: 'item-id',
      dispatch: jest.fn(),
    })(state);

    expect(name).toEqual('item name');
  });
});
