import { createTestStore } from '../../../../core/create-store';
import { createDeleteFolderScreenViewModel } from './delete-folder-screen.viewmodel';
import { deleteFolderUseCase } from '../../../../core/folders/hexagon/usecases/delete-folder/delete-folder.usecase';
import { stateBuilder } from '../../../../core/state-builder';
import { folderBuilder } from '../../../../core/folders/__tests__/folder.builder';

describe('DeleteFolderScreenViewModel', () => {
  it('Should call deleteFOlderUseCase when deleteFolder is called', async () => {
    const store = createTestStore();

    const { deleteFolder } = createDeleteFolderScreenViewModel({
      folderId: 'folder-id',
      dispatch: store.dispatch,
    })(store.getState());

    await deleteFolder();

    expect(store.getDispatchedUseCaseArgs(deleteFolderUseCase)).toEqual(
      'folder-id',
    );
  });

  it('Should return the folder name', () => {
    const state = stateBuilder()
      .withFolders([
        folderBuilder().withId('folder-id').withName('Folder name').build(),
      ])
      .build();
    const { folder } = createDeleteFolderScreenViewModel({
      folderId: 'folder-id',
      dispatch: jest.fn(),
    })(state);

    expect(folder).toEqual({
      name: 'Folder name',
    });
  });
});
