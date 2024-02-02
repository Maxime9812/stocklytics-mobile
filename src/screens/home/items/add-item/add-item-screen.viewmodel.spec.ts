import { createTestStore } from '../../../../core/create-store';
import { createAddItemScreenViewModel } from './add-item-screen.viewmodel';
import { addItemInFolderUseCase } from '../../../../core/items/hexagon/usecases/add-item-in-folder/add-item-in-folder.usecase';
import { stateBuilder } from '../../../../core/state-builder';
import { folderBuilder } from '../../../../core/folders/__tests__/folder.builder';

describe('AddItemScreenViewModel', () => {
  test('Should call addItemInFolderUseCase when call addItem', async () => {
    const store = createTestStore();

    const { addItem } = createAddItemScreenViewModel({
      folderId: 'folder-id',
      dispatch: store.dispatch,
    })(store.getState());

    await addItem({ name: 'item-name', quantity: 10 });

    expect(store.getDispatchedUseCaseArgs(addItemInFolderUseCase)).toEqual({
      folderId: 'folder-id',
      name: 'item-name',
      quantity: 10,
    });
  });
  it.each(['Electronics', 'Other'])('Should have folder name', (name) => {
    const initialValue = stateBuilder()
      .withFolders([folderBuilder().withId('folder-id').withName(name).build()])
      .build();
    const store = createTestStore({}, initialValue);

    const { folderName } = createAddItemScreenViewModel({
      folderId: 'folder-id',
      dispatch: store.dispatch,
    })(store.getState());

    expect(folderName).toEqual(name);
  });
  it('Should return Root folder name when folderId is undefined', () => {
    const store = createTestStore();

    const { folderName } = createAddItemScreenViewModel({
      folderId: undefined,
      dispatch: store.dispatch,
    })(store.getState());

    expect(folderName).toEqual('Root');
  });
});
