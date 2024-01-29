import { ItemModel } from '../hexagon/models/item.model';
import { createTestStore, TestStore } from '../../create-store';
import { getItemByIdUseCase } from '../hexagon/usecases/get-item-by-id/get-item-by-id.usecase';
import { stateBuilder } from '../../state-builder';
import { StubItemsGateway } from '../infra/gateways/stub-items.gateway';
import { getItemsInFolderUseCase } from '../hexagon/usecases/get-items-in-folder/get-items-in-folder.usecase';

export const createItemsFixture = () => {
  const itemsGateway = new StubItemsGateway();
  let store: TestStore;

  return {
    givenItemsInFolder: (folderId: string | undefined, items: ItemModel[]) => {
      itemsGateway.givenItemsInFolder(folderId, items);
    },
    givenItems: (item: ItemModel[]) => {
      itemsGateway.givenItems(item);
    },
    whenGetItemById: (id: string) => {
      store = createTestStore({ itemsGateway });
      return store.dispatch(getItemByIdUseCase(id));
    },
    whenGetItemsInFolder: (folderId: string | undefined) => {
      store = createTestStore({ itemsGateway });
      return store.dispatch(getItemsInFolderUseCase(folderId));
    },
    thenItemIsLoading: (id: string) => {
      expect(store.getState()).toEqual(
        stateBuilder().withLoadingItem([id]).build(),
      );
    },
    thenFolderIsLoading: (folderId: string | undefined) => {
      expect(store.getState()).toEqual(
        stateBuilder()
          .withLoadingFoldersItems([folderId ?? 'root'])
          .build(),
      );
    },
    thenItemsIs: (items: ItemModel[]) => {
      expect(store.getState()).toEqual(
        stateBuilder()
          .withItems(items)
          .withNotLoadingItem(items.map((i) => i.id))
          .build(),
      );
    },
    thenFoldersItemsIs: (folderId: string | undefined, items: ItemModel[]) => {
      expect(store.getState()).toEqual(
        stateBuilder()
          .withItems(items)
          .withNotLoadingFoldersItems([folderId ?? 'root'])
          .build(),
      );
    },
  };
};

export type ItemsFixture = ReturnType<typeof createItemsFixture>;
