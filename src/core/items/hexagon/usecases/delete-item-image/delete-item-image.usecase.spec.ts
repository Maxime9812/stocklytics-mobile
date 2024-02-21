import {
  createItemsFixture,
  ItemsFixture,
} from '../../../__tests__/items.fixture';
import { itemBuilder } from '../../../__tests__/item.builder';

describe('Feature: Delete item image', () => {
  let fixture: ItemsFixture;

  beforeEach(() => {
    fixture = createItemsFixture();
  });

  test('Should delete item image', async () => {
    const initialitemBuilder = itemBuilder()
      .withId('item-id')
      .withImage('image');
    fixture.givenExistingItems([initialitemBuilder.build()]);

    await fixture.whenDeleteItemImage('item-id');

    fixture.thenItemImageIsDeleted('item-id');

    fixture.thenItemsIs([
      {
        ...initialitemBuilder.withoutImage().build(),
        tags: [],
      },
    ]);
  });
});
