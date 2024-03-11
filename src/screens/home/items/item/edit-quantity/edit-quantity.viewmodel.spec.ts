import { createTestStore } from '../../../../../core/create-store';
import { createEditQuantityViewModel } from './edit-quantity.viewmodel';
import { adjustItemQuantityUseCase } from '../../../../../core/items/hexagon/usecases/adjust-item-quantity/adjust-item-quantity.usecase';
import { stateBuilder } from '../../../../../core/state-builder';
import { itemBuilder } from '../../../../../core/items/__tests__/item.builder';

describe('EditQuantityViewModel', () => {
  it('Should call adjustItemQuantityUseCas when call adjust', async () => {
    const store = createTestStore();

    const { adjust } = createEditQuantityViewModel({
      dispatch: store.dispatch,
      itemId: 'item-id',
    })(store.getState());

    await adjust(5);

    expect(store.getDispatchedUseCaseArgs(adjustItemQuantityUseCase)).toEqual({
      itemId: 'item-id',
      quantity: 5,
    });
  });

  it('Should return current item quantity', () => {
    const state = stateBuilder()
      .withItems([itemBuilder().withId('item-id').withQuantity(100).build()])
      .build();

    const { currentQuantity } = createEditQuantityViewModel({
      dispatch: jest.fn,
      itemId: 'item-id',
    })(state);

    expect(currentQuantity).toEqual(100);
  });

  describe('Adjusted quantity', () => {
    it('Should return adjusted quantity', () => {
      const state = stateBuilder()
        .withItems([itemBuilder().withId('item-id').withQuantity(100).build()])
        .build();

      const { adjustedQuantity } = createEditQuantityViewModel({
        dispatch: jest.fn,
        itemId: 'item-id',
        quantityToAdjust: -5,
      })(state);

      expect(adjustedQuantity).toEqual(95);
    });
  });

  it('Should return item name ', () => {
    const state = stateBuilder()
      .withItems([
        itemBuilder().withId('item-id').withName('item-name').build(),
      ])
      .build();

    const { itemName } = createEditQuantityViewModel({
      dispatch: jest.fn,
      itemId: 'item-id',
    })(state);

    expect(itemName).toEqual('item-name');
  });

  describe('Can adjust', () => {
    it('Should return true when newQuantity is positive', () => {
      const state = stateBuilder()
        .withItems([itemBuilder().withId('item-id').withQuantity(100).build()])
        .build();

      const { canAdjust } = createEditQuantityViewModel({
        dispatch: jest.fn,
        itemId: 'item-id',
        quantityToAdjust: -5,
      })(state);

      expect(canAdjust).toBeTruthy();
    });

    it('Should return false when newQuantity is negative', () => {
      const state = stateBuilder()
        .withItems([itemBuilder().withId('item-id').withQuantity(100).build()])
        .build();

      const { canAdjust } = createEditQuantityViewModel({
        dispatch: jest.fn,
        itemId: 'item-id',
        quantityToAdjust: -101,
      })(state);

      expect(canAdjust).toBeFalsy();
    });

    it('Should return true when newQuantity is 0', () => {
      const state = stateBuilder()
        .withItems([itemBuilder().withId('item-id').withQuantity(100).build()])
        .build();

      const { canAdjust } = createEditQuantityViewModel({
        dispatch: jest.fn,
        itemId: 'item-id',
        quantityToAdjust: -100,
      })(state);

      expect(canAdjust).toBeTruthy();
    });
  });
});
