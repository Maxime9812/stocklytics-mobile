import {
  createItemsFixture,
  ItemsFixture,
} from '../../../__tests__/items.fixture';
import { itemBuilder } from '../../../__tests__/item.builder';

describe('Feature: Delete item', () => {
  let fixture: ItemsFixture;

  beforeEach(() => {
    fixture = createItemsFixture();
  });

  test('Item is deleted', async () => {
    fixture.givenExistingItems([itemBuilder().withId('item-id').build()]);

    await fixture.whenDeleteItem({ itemId: 'item-id' });

    fixture.thenItemDeletionIsRequested('item-id');

    fixture.thenItemsIs([]);
  });
});
