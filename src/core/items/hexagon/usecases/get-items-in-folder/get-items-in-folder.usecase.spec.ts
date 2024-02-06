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
    const item1 = itemBuilder().withId('item-id-1').build();
    const item2 = itemBuilder().withId('item-id-2').build();

    fixture.givenItemsInFolder('folder-id', [
      { ...item1, tags: [] },
      { ...item2, tags: [] },
    ]);

    const action = fixture.whenGetItemsInFolder('folder-id');
    fixture.thenFolderIsLoading('folder-id');
    await action;
    fixture.thenFoldersItemsIs('folder-id', [
      { ...item1, tags: [] },
      { ...item2, tags: [] },
    ]);
  });

  test('Can get items in root folder', async () => {
    const item1 = itemBuilder().withId('item-id-1').build();
    const item2 = itemBuilder().withId('item-id-2').build();
    fixture.givenItemsInFolder(undefined, [
      { ...item1, tags: [] },
      { ...item2, tags: [] },
    ]);

    const action = fixture.whenGetItemsInFolder(undefined);
    fixture.thenFolderIsLoading(undefined);
    await action;
    fixture.thenFoldersItemsIs(undefined, [
      { ...item1, tags: [] },
      { ...item2, tags: [] },
    ]);
  });

  test('Can get items in folder with tags', async () => {
    const item1 = itemBuilder()
      .withId('item-id-1')
      .withTags(['tags-1'])
      .build();
    const item2 = itemBuilder()
      .withId('item-id-2')
      .withTags(['tags-2'])
      .build();
    fixture.givenItemsInFolder('folder-id', [
      { ...item1, tags: [{ id: 'tags-1', name: 'Tag 1' }] },
      { ...item2, tags: [{ id: 'tags-2', name: 'Tag 2' }] },
    ]);

    const action = fixture.whenGetItemsInFolder('folder-id');
    fixture.thenFolderIsLoading('folder-id');
    await action;
    fixture.thenFoldersItemsIs('folder-id', [
      { ...item1, tags: [{ id: 'tags-1', name: 'Tag 1' }] },
      { ...item2, tags: [{ id: 'tags-2', name: 'Tag 2' }] },
    ]);
  });
});
