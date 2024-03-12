import { stateBuilder } from '../../../../../core/state-builder';
import { itemBuilder } from '../../../../../core/items/__tests__/item.builder';
import { createMoveItemScreenViewModel } from './move-item-screen.viewmodel';
import { createTestStore } from '../../../../../core/create-store';
import { moveItemUseCase } from '../../../../../core/items/hexagon/usecases/move-item/move-item.usecase';

describe('MoveItemScreenViewModel', () => {
  it('should call moveItemUseCase when call moveItem', async () => {
    const state = stateBuilder()
      .withItems([itemBuilder().withId('item-id').build()])
      .build();
    const store = createTestStore({}, state);

    const { moveItem } = createMoveItemScreenViewModel({
      dispatch: store.dispatch,
      itemId: 'item-id',
      selectedFolderId: 'folder-id',
    })(store.getState());

    await moveItem();

    expect(store.getDispatchedUseCaseArgs(moveItemUseCase)).toEqual({
      itemId: 'item-id',
      folderId: 'folder-id',
    });
  });

  it('should call moveItemUseCase when call moveItem when folder selected is root', async () => {
    const state = stateBuilder()
      .withItems([itemBuilder().withId('item-id').build()])
      .build();
    const store = createTestStore({}, state);

    const { moveItem } = createMoveItemScreenViewModel({
      dispatch: store.dispatch,
      itemId: 'item-id',
      selectedFolderId: 'root',
    })(store.getState());

    await moveItem();

    expect(store.getDispatchedUseCaseArgs(moveItemUseCase)).toEqual({
      itemId: 'item-id',
    });
  });

  it('Should return item name', async () => {
    const state = stateBuilder()
      .withItems([
        itemBuilder().withId('item-id').withName('Iphone 13').build(),
      ])
      .build();

    const { itemName } = createMoveItemScreenViewModel({
      itemId: 'item-id',
      dispatch: jest.fn,
    })(state);

    expect(itemName).toEqual('Iphone 13');
  });

  describe('Can submit', () => {
    it('Can NOT submit if folder is not selected', async () => {
      const state = stateBuilder()
        .withItems([itemBuilder().withId('item-id').build()])
        .build();

      const { canSubmit } = createMoveItemScreenViewModel({
        itemId: 'item-id',
        dispatch: jest.fn,
      })(state);

      expect(canSubmit).toEqual(false);
    });

    it('Can submit if folder is selected', async () => {
      const state = stateBuilder()
        .withItems([itemBuilder().withId('item-id').build()])
        .build();

      const { canSubmit } = createMoveItemScreenViewModel({
        itemId: 'item-id',
        selectedFolderId: 'folder-id',
        dispatch: jest.fn,
      })(state);

      expect(canSubmit).toEqual(true);
    });
  });
});
