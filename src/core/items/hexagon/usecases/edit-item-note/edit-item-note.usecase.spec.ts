import {
  createItemsFixture,
  ItemsFixture,
} from '../../../__tests__/items.fixture';
import { itemBuilder } from '../../../__tests__/item.builder';

describe('Feature: Edit item note', () => {
  let fixture: ItemsFixture;

  beforeEach(() => {
    fixture = createItemsFixture();
  });

  test('Note is updated', async () => {
    fixture.givenExistingItems([
      itemBuilder().withId('item-id').withNote('').build(),
    ]);

    await fixture.whenEditNote({
      itemId: 'item-id',
      note: 'New note',
    });

    fixture.thenNoteShouldBeenEdited({
      id: 'item-id',
      note: 'New note',
    });

    fixture.thenItemsIs([
      {
        id: 'item-id',
        name: 'Iphone 13 pro max',
        createdAt: '2024-01-01',
        folderId: null,
        tags: [],
        quantity: 1,
        note: 'New note',
      },
    ]);
  });
});
