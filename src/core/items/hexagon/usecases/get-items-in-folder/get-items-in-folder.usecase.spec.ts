import {
  createItemsFixture,
  ItemsFixture,
} from '../../../__tests__/items.fixture';
import { itemBuilder } from '../../../__tests__/item.builder';

describe('Feature: Get Items In Folder', () => {
  let fixture: ItemsFixture;

  beforeEach(() => {
    fixture = createItemsFixture();
  });

  test('Can get items in folder', async () => {
    const items = [
      itemBuilder().withId('item-id-1').build(),
      itemBuilder().withId('item-id-2').build(),
      itemBuilder().withId('item-id-3').build(),
    ];
    fixture.givenItemsInFolder('folder-id', items);

    const action = fixture.whenGetItemsInFolder('folder-id');
    fixture.thenFolderIsLoading('folder-id');
    await action;
    fixture.thenFoldersItemsIs('folder-id', items);
  });

  test('Can get items in root folder', async () => {
    const items = [
      itemBuilder().withId('item-id-1').build(),
      itemBuilder().withId('item-id-2').build(),
      itemBuilder().withId('item-id-3').build(),
    ];
    fixture.givenItemsInFolder(undefined, items);

    const action = fixture.whenGetItemsInFolder(undefined);
    fixture.thenFolderIsLoading(undefined);
    await action;
    fixture.thenFoldersItemsIs(undefined, items);
  });
});
