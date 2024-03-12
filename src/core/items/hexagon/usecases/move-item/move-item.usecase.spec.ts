import {
  createItemsFixture,
  ItemsFixture,
} from '../../../__tests__/items.fixture';
import { itemBuilder } from '../../../__tests__/item.builder';

describe('Feature: Move item to folder', () => {
  let fixture: ItemsFixture;

  beforeEach(() => {
    fixture = createItemsFixture();
  });

  test('Item is moved to folder', async () => {
    const initialItemBuilder = itemBuilder()
      .withId('item-id')
      .withFolderId(null);
    fixture.givenExistingItems([initialItemBuilder.build()]);

    await fixture.whenMoveItemToFolder({
      itemId: 'item-id',
      folderId: 'folder-id',
    });

    fixture.thenItemIsMoved({
      itemId: 'item-id',
      folderId: 'folder-id',
    });

    fixture.thenItemsIs([
      { ...initialItemBuilder.withFolderId('folder-id').build(), tags: [] },
    ]);
  });
});
