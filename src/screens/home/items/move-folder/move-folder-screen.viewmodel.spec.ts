import { stateBuilder } from '../../../../core/state-builder';
import { folderBuilder } from '../../../../core/folders/__tests__/folder.builder';
import { createTestStore } from '../../../../core/create-store';
import { createMoveFolderScreenViewModel } from './move-folder-screen.viewmodel';
import { moveFolderUseCase } from '../../../../core/folders/hexagon/usecases/move-folder/move-folder.usecase';

describe('MoveFolderScreenViewModel', () => {
  it('should call moveFolderUseCase when call moveFolder', async () => {
    const state = stateBuilder()
      .withFolders([folderBuilder().withId('folder-id').build()])
      .build();
    const store = createTestStore({}, state);

    const { moveFolder } = createMoveFolderScreenViewModel({
      dispatch: store.dispatch,
      folderId: 'folder-id',
      selectedFolderId: 'parent-id',
    })(store.getState());

    await moveFolder();

    expect(store.getDispatchedUseCaseArgs(moveFolderUseCase)).toEqual({
      folderId: 'folder-id',
      parentId: 'parent-id',
    });
  });

  it('should call moveFolderUseCase when call moveFolder for root', async () => {
    const state = stateBuilder()
      .withFolders([folderBuilder().withId('folder-id').build()])
      .build();
    const store = createTestStore({}, state);

    const { moveFolder } = createMoveFolderScreenViewModel({
      dispatch: store.dispatch,
      folderId: 'folder-id',
      selectedFolderId: 'root',
    })(store.getState());

    await moveFolder();

    expect(store.getDispatchedUseCaseArgs(moveFolderUseCase)).toEqual({
      folderId: 'folder-id',
    });
  });

  describe('Can submit', () => {
    it('should be true when folder is selected', () => {
      const state = stateBuilder()
        .withFolders([folderBuilder().withId('folder-id').build()])
        .build();

      const { canSubmit } = createMoveFolderScreenViewModel({
        folderId: 'folder-id',
        dispatch: jest.fn,
        selectedFolderId: 'parent-id',
      })(state);

      expect(canSubmit).toBeTruthy();
    });

    it('should be false when folder is NOT selected', () => {
      const state = stateBuilder()
        .withFolders([folderBuilder().withId('folder-id').build()])
        .build();

      const { canSubmit } = createMoveFolderScreenViewModel({
        folderId: 'folder-id',
        dispatch: jest.fn,
      })(state);

      expect(canSubmit).toBeFalsy();
    });
  });

  describe('Folder name', () => {
    it('Should return folder name', () => {
      const state = stateBuilder()
        .withFolders([
          folderBuilder().withId('folder-id').withName('Folder 1').build(),
        ])
        .build();

      const { folderName } = createMoveFolderScreenViewModel({
        folderId: 'folder-id',
        dispatch: jest.fn,
      })(state);

      expect(folderName).toEqual('Folder 1');
    });
  });
});
