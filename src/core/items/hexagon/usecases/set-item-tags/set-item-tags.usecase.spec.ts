import {
  createItemsFixture,
  ItemsFixture,
} from '../../../__tests__/items.fixture';
import { itemBuilder } from '../../../__tests__/item.builder';

describe('Feature: Set item tags', () => {
  let fixture: ItemsFixture;

  beforeEach(() => {
    fixture = createItemsFixture();
  });

  it('Tags is set', async () => {
    fixture.givenExistingItems([
      itemBuilder().withId('item-id').withTags([]).build(),
    ]);

    await fixture.whenSetTags({
      itemId: 'item-id',
      tagIds: ['tag-id', 'tag-id-2'],
    });

    fixture.thenSetTagsIsRequested('item-id', ['tag-id', 'tag-id-2']);

    fixture.thenStateIs((state) =>
      state.withItems([
        itemBuilder()
          .withId('item-id')
          .withTags(['tag-id', 'tag-id-2'])
          .build(),
      ]),
    );
  });
});
