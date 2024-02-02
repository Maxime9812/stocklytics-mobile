import { createTestStore } from '../../../../core/create-store';
import { folderBuilder } from '../../../../core/folders/__tests__/folder.builder';
import { stateBuilder } from '../../../../core/state-builder';
import { createAddFolderScreenViewModel } from './add-folder-screen.viewmodel';
import { addFolderUseCase } from '../../../../core/folders/hexagon/usecases/add-folder/add-folder.usecase';

describe('AddFolderScreenViewModel', () => {
  test('Should call addFolderUseCase when call addFolder', async () => {
    const store = createTestStore();

    const { addFolder } = createAddFolderScreenViewModel({
      parentId: 'parent-id',
      dispatch: store.dispatch,
    })(store.getState());

    await addFolder({ name: 'folder-name' });

    expect(store.getDispatchedUseCaseArgs(addFolderUseCase)).toEqual({
      name: 'folder-name',
      parentId: 'parent-id',
    });
  });
  it('Should return Root folder name when folderId is undefined', () => {
    const store = createTestStore();

    const { folderName } = createAddFolderScreenViewModel({
      parentId: undefined,
      dispatch: store.dispatch,
    })(store.getState());

    expect(folderName).toEqual('Root');
  });
  it('Should have folder name', () => {
    const initialValue = stateBuilder()
      .withFolders([
        folderBuilder().withId('folder-id').withName('Electronics').build(),
      ])
      .build();
    const store = createTestStore({}, initialValue);

    const { folderName } = createAddFolderScreenViewModel({
      parentId: 'folder-id',
      dispatch: store.dispatch,
    })(store.getState());

    expect(folderName).toEqual('Electronics');
  });
});
