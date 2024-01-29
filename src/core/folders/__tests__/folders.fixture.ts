import { createTestStore, TestStore } from '../../create-store';
import { stateBuilder } from '../../state-builder';
import { FolderModel } from '../hexagon/models/folder.model';
import { getFoldersInFolderUseCase } from '../hexagon/usecases/get-folders-in-folder/get-folders-in-folder.usecase';
import { StubFoldersGateway } from '../infra/gateways/stub-folders.gateway';

export const createFoldersFixture = () => {
  const foldersGateway = new StubFoldersGateway();
  let store: TestStore;

  return {
    givenFoldersInFolder: (folders: FolderModel[], folderId?: string) => {
      foldersGateway.givenFoldersInFolder(folders, folderId);
    },
    whenGetFoldersInFolder: (folderId?: string) => {
      store = createTestStore({ foldersGateway });
      return store.dispatch(getFoldersInFolderUseCase(folderId));
    },
    thenFoldersInFolderShouldBeLoading: (folderId?: string) => {
      expect(store.getState()).toEqual(
        stateBuilder().withFolderInFolderLoading(folderId).build(),
      );
    },
    thenFoldersShouldBe: (folders: FolderModel[]) => {
      const expectedState = stateBuilder()
        .withFolders(folders)
        .withFolderInFolderNotLoading(folders[0].parentId);
      for (const folder of folders) {
        expectedState.withFolderInFolderNotLoading(folder.parentId);
      }
      expect(store.getState()).toEqual(expectedState.build());
    },
  };
};

export type FoldersFixture = ReturnType<typeof createFoldersFixture>;
