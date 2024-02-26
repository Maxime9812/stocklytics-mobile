import {
  createItemsFixture,
  ItemsFixture,
} from '../../../__tests__/items.fixture';
import { itemBuilder } from '../../../__tests__/item.builder';

describe('Feature: Add image to item', () => {
  let fixture: ItemsFixture;

  beforeEach(() => {
    fixture = createItemsFixture();
  });

  test('Should add image to item', async () => {
    const initialItemBuilder = itemBuilder().withId('item-id');
    fixture.givenExistingItems([initialItemBuilder.build()]);
    fixture.givenUUID('image-id');
    fixture.givenImageAdded(
      {
        itemId: 'item-id',
        image: {
          id: 'image-id',
          path: 'image-path',
        },
      },
      'image-url',
    );

    await fixture.whenAddImageToItem({
      itemId: 'item-id',
      imagePath: 'image-path',
    });

    fixture.thenItemsIs([
      {
        ...initialItemBuilder.withImage('image-url').build(),
        tags: [],
      },
    ]);
  });
});
