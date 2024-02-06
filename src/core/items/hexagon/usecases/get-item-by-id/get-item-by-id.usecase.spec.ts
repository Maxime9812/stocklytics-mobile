import {
  createItemsFixture,
  ItemsFixture,
} from '../../../__tests__/items.fixture';
import { itemBuilder } from '../../../__tests__/item.builder';

describe('Feature: Get Item By Id', () => {
  let fixture: ItemsFixture;

  beforeEach(() => {
    fixture = createItemsFixture();
  });

  test('Item exists', async () => {
    const item = itemBuilder().withId('item-id').build();
    fixture.givenItems([{ ...item, tags: [] }]);
    const action = fixture.whenGetItemById('item-id');
    fixture.thenItemIsLoading('item-id');
    await action;
    fixture.thenItemsIs([{ ...item, tags: [] }]);
  });
});
