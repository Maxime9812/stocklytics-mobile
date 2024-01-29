import {
  createFoldersFixture,
  FoldersFixture,
} from '../../../__tests__/folders.fixture';
import { folderBuilder } from '../../../__tests__/folder.builder';

describe('Feature: Get folders in folder', () => {
  let fixture: FoldersFixture;

  beforeEach(() => {
    fixture = createFoldersFixture();
  });

  test('Folder exist and have folder in it', async () => {
    const folders = [
      folderBuilder().withId('folder-1').build(),
      folderBuilder().withId('folder-2').build(),
    ];
    fixture.givenFoldersInFolder(folders);
    const action = fixture.whenGetFoldersInFolder();
    fixture.thenFoldersInFolderShouldBeLoading();
    await action;
    fixture.thenFoldersShouldBe(folders);
  });
});
