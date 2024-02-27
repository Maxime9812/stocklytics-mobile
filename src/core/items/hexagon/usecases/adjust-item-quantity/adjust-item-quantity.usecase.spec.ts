import {
  createItemsFixture,
  ItemsFixture,
} from '../../../__tests__/items.fixture';
import { itemBuilder } from '../../../__tests__/item.builder';

describe('Feature: Adjust item quantity', () => {
  let fixture: ItemsFixture;

  beforeEach(() => {
    fixture = createItemsFixture();
  });

  test('Item quantity is adjusted', async () => {
    fixture.givenExistingItems([
      itemBuilder().withId('item-id').withQuantity(10).build(),
    ]);

    await fixture.whenAdjustQuantity({
      itemId: 'item-id',
      quantity: 5,
    });

    fixture.thenItemsIs([
      { ...itemBuilder().withId('item-id').withQuantity(15).build(), tags: [] },
    ]);
  });
});
