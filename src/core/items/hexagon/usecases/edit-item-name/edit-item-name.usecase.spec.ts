import {
  createItemsFixture,
  ItemsFixture,
} from '../../../__tests__/items.fixture';
import { itemBuilder } from '../../../__tests__/item.builder';

describe('Feature: Edit Item Name', () => {
  let fixture: ItemsFixture;

  beforeEach(() => {
    fixture = createItemsFixture();
  });

  test('Can change item name', async () => {
    const initialItemBuilder = itemBuilder()
      .withId('item-id')
      .withName('initial name');

    fixture.givenExistingItems([initialItemBuilder.build()]);

    await fixture.whenChangeItemName({
      itemId: 'item-id',
      name: 'new name',
    });

    fixture.thenNameShouldBeChanged({
      itemId: 'item-id',
      name: 'new name',
    });

    fixture.thenItemsIs([
      { ...initialItemBuilder.withName('new name').build(), tags: [] },
    ]);
  });
});
