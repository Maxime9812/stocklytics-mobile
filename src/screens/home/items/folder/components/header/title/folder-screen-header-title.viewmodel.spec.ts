import { createFolderScreenHeaderTitleViewModel } from './folder-screen-header-title.viewmodel';
import { stateBuilder } from '../../../../../../../core/state-builder';
import { folderBuilder } from '../../../../../../../core/folders/__tests__/folder.builder';

describe('FolderScreenHeaderTitleViewModel', () => {
  it('should have isRoot true when folder is root', () => {
    const initialState = stateBuilder().build();
    const { isRoot } = createFolderScreenHeaderTitleViewModel({})(initialState);
    expect(isRoot).toEqual(true);
  });

  it('should have isRoot false when folder is NOT root', () => {
    const initialState = stateBuilder().build();
    const { isRoot } = createFolderScreenHeaderTitleViewModel({
      folderId: 'folder-id',
    })(initialState);
    expect(isRoot).toEqual(false);
  });

  it('should return folder name', () => {
    const initialState = stateBuilder()
      .withFolders([
        folderBuilder().withId('folder-id').withName('Electronics').build(),
      ])
      .build();
    const { name } = createFolderScreenHeaderTitleViewModel({
      folderId: 'folder-id',
    })(initialState);
    expect(name).toEqual('Electronics');
  });
});
