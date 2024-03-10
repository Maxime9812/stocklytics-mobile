import { createFolderScreenHeaderRightViewModel } from './folder-screen-header-right.viewmodel';
import { stateBuilder } from '../../../../../../../core/state-builder';
import { folderBuilder } from '../../../../../../../core/folders/__tests__/folder.builder';

describe('FolderScreenHeaderRightViewModel', () => {
  it('Should have folderName when folder is find', () => {
    const { folderName } = createFolderScreenHeaderRightViewModel('folderId')(
      stateBuilder()
        .withFolders([
          folderBuilder().withId('folderId').withName('Folder Name').build(),
        ])
        .build(),
    );
    expect(folderName).toBe('Folder Name');
  });

  it('Should have folderName root.folder translation key when folder is root', () => {
    const { folderName } = createFolderScreenHeaderRightViewModel()(
      stateBuilder().build(),
    );
    expect(folderName).toBe('folder.rootName');
  });
});
