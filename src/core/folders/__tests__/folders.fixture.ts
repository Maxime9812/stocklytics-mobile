import { createTestStore, TestStore } from '../../create-store';
import { stateBuilder } from '../../state-builder';
import { FolderModel } from '../hexagon/models/folder.model';
import { getFoldersInFolderUseCase } from '../hexagon/usecases/get-folders-in-folder/get-folders-in-folder.usecase';
import { StubFoldersGateway } from '../infra/gateways/stub-folders.gateway';
import {
  addFolderUseCase,
  AddFolderUseCasePayload,
} from '../hexagon/usecases/add-folder/add-folder.usecase';
import { DeterministicUUIDProvider } from '../../common/uuid-provider/deterministic-uuid.provider';
import {
  AddFolderPayload,
  MoveFolderPayload,
} from '../hexagon/gateways/folders.gateway';
import { deleteFolderUseCase } from '../hexagon/usecases/delete-folder/delete-folder.usecase';
import {
  moveFolderUseCase,
  MoveFolderUseCasePayload,
} from '../hexagon/usecases/move-folder/move-folder.usecase';

export const createFoldersFixture = () => {
  const foldersGateway = new StubFoldersGateway();
  const uuidProvider = new DeterministicUUIDProvider();
  let store: TestStore;
  let initialState = stateBuilder();

  return {
    givenUUID: (uuid: string) => {
      uuidProvider.givenUUID(uuid);
    },
    givenFolderAdded: (payload: AddFolderPayload, folder: FolderModel) => {
      foldersGateway.givenFolderAdded(payload, folder);
    },
    givenFoldersInFolder: (folders: FolderModel[], folderId?: string) => {
      foldersGateway.givenFoldersInFolder(folders, folderId);
    },
    givenFolders: (folders: FolderModel[]) => {
      initialState = initialState.withFolders(folders);
    },
    whenGetFoldersInFolder: (folderId?: string) => {
      store = createTestStore({ foldersGateway });
      return store.dispatch(getFoldersInFolderUseCase(folderId));
    },
    whenAddFolder: (payload: AddFolderUseCasePayload) => {
      store = createTestStore({ foldersGateway, uuidProvider });
      return store.dispatch(addFolderUseCase(payload));
    },
    whenDeleteFolder: (folderId: string) => {
      store = createTestStore({ foldersGateway }, initialState.build());
      return store.dispatch(deleteFolderUseCase(folderId));
    },
    whenMoveFolder: (payload: MoveFolderUseCasePayload) => {
      store = createTestStore({ foldersGateway }, initialState.build());
      return store.dispatch(moveFolderUseCase(payload));
    },
    thenFolderShouldBeMoved: (payload: MoveFolderPayload) => {
      expect(foldersGateway.lastMovedFolder).toEqual(payload);
    },
    thenFolderDeletionShouldBeRequested: (folderId: string) => {
      expect(foldersGateway.lastDeletedFolder).toEqual(folderId);
    },
    thenFoldersInFolderShouldBeLoading: (folderId?: string) => {
      expect(store.getState()).toEqual(
        stateBuilder()
          .withFolderInFolderLoading(folderId ?? null)
          .build(),
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
    thenFoldersShouldBeEmpty() {
      expect(store.getState()).toEqual(stateBuilder().build());
    },
  };
};

export type FoldersFixture = ReturnType<typeof createFoldersFixture>;
