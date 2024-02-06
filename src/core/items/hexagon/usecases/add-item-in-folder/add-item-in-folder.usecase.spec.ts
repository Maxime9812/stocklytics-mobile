import {
  createItemsFixture,
  ItemsFixture,
} from '../../../__tests__/items.fixture';
import { itemBuilder } from '../../../__tests__/item.builder';

describe('Feature: Add item in folder', () => {
  let fixture: ItemsFixture;

  beforeEach(() => {
    fixture = createItemsFixture();
  });

  test('Can add item in folder', async () => {
    const itemAdded = itemBuilder()
      .withId('item-1')
      .withQuantity(4)
      .withName('Iphone 13 pro max')
      .withFolderId('folder-id')
      .build();
    fixture.givenUUID('item-1');
    fixture.givenAddedItemInFolder(
      {
        id: 'item-1',
        name: 'Iphone 13 pro max',
        quantity: 4,
        folderId: 'folder-1',
      },
      { ...itemAdded, tags: [] },
    );

    await fixture.whenAddItemInFolder({
      name: 'Iphone 13 pro max',
      quantity: 4,
      folderId: 'folder-1',
    });

    fixture.thenItemsIs([{ ...itemAdded, tags: [] }]);
  });

  test('An error occur', async () => {
    fixture.givenUUID('item-1');

    await fixture.whenAddItemInFolder({
      name: 'Iphone 13 pro max',
      quantity: 4,
      folderId: 'folder-1',
    });

    fixture.thenItemsIs([]);
  });
});
