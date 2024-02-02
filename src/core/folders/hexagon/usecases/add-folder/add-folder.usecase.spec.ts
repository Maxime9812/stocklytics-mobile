import {
  createFoldersFixture,
  FoldersFixture,
} from '../../../__tests__/folders.fixture';
import { folderBuilder } from '../../../__tests__/folder.builder';
import { isRejected } from '@reduxjs/toolkit';

describe('Feature: Add folder', () => {
  let fixture: FoldersFixture;

  beforeEach(() => {
    fixture = createFoldersFixture();
  });

  test('Can add folder', async () => {
    const folderAdded = folderBuilder()
      .withId('new-folder-id')
      .withName('New folder')
      .withParentId('parent-id')
      .build();

    fixture.givenUUID('new-folder-id');
    fixture.givenFolderAdded(
      {
        id: 'new-folder-id',
        name: 'New folder',
        parentId: 'parent-id',
      },
      folderAdded,
    );
    await fixture.whenAddFolder({
      name: 'New folder',
      parentId: 'parent-id',
    });
    fixture.thenFoldersShouldBe([folderAdded]);
  });
  test('Error when adding folder', async () => {
    fixture.givenUUID('new-folder-id');
    const action = await fixture.whenAddFolder({
      name: 'New folder',
      parentId: 'parent-id',
    });
    expect(isRejected(action)).toBe(true);
  });
});
