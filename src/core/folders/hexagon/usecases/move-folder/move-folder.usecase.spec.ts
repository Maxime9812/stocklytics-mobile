import {
  createFoldersFixture,
  FoldersFixture,
} from '../../../__tests__/folders.fixture';
import { folderBuilder } from '../../../__tests__/folder.builder';

describe('Feature: Move folder', () => {
  let fixture: FoldersFixture;

  beforeEach(() => {
    fixture = createFoldersFixture();
  });

  it('should move folder', async () => {
    const initialFolderBuilder = folderBuilder()
      .withId('folder-id')
      .withParentId('parent-id');

    fixture.givenFolders([initialFolderBuilder.build()]);

    await fixture.whenMoveFolder({
      folderId: 'folder-id',
      parentId: 'new-parent-id',
    });

    fixture.thenFolderShouldBeMoved({
      id: 'folder-id',
      parentId: 'new-parent-id',
    });

    fixture.thenFoldersShouldBe([
      initialFolderBuilder.withParentId('new-parent-id').build(),
    ]);
  });
});
