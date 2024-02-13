import {
  createFoldersFixture,
  FoldersFixture,
} from '../../../__tests__/folders.fixture';
import { folderBuilder } from '../../../__tests__/folder.builder';

describe('Feature: Delete folder', () => {
  let fixture: FoldersFixture;

  beforeEach(() => {
    fixture = createFoldersFixture();
  });

  test('Folder is deleted', async () => {
    fixture.givenFolders([folderBuilder().withId('folder-id').build()]);

    await fixture.whenDeleteFolder('folder-id');

    fixture.thenFolderDeletionShouldBeRequested('folder-id');

    fixture.thenFoldersShouldBeEmpty();
  });
});
