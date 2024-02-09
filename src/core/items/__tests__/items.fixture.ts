import { ItemModel } from '../hexagon/models/item.model';
import { createTestStore, TestStore } from '../../create-store';
import { getItemByIdUseCase } from '../hexagon/usecases/get-item-by-id/get-item-by-id.usecase';
import { stateBuilder } from '../../state-builder';
import { StubItemsGateway } from '../infra/gateways/items-gateway/stub-items.gateway';
import { getItemsInFolderUseCase } from '../hexagon/usecases/get-items-in-folder/get-items-in-folder.usecase';
import {
  addItemInFolderUseCase,
  AddItemInFolderUseCasePayload,
} from '../hexagon/usecases/add-item-in-folder/add-item-in-folder.usecase';
import { DeterministicUUIDProvider } from '../../common/uuid-provider/deterministic-uuid.provider';
import {
  AddItemInFolderPayload,
  EditNotePayload,
  Item,
} from '../hexagon/gateways/items.gateway';
import { Tag } from '../../tags/hexagon/models/tag.model';
import {
  editItemNoteUseCase,
  EditItemNoteUseCasePayload,
} from '../hexagon/usecases/edit-item-note/edit-item-note.usecase';

type ExpectedItem = Omit<ItemModel, 'tags'> & { tags: Tag[] };

export const createItemsFixture = () => {
  const itemsGateway = new StubItemsGateway();
  const uuidProvider = new DeterministicUUIDProvider();
  let store: TestStore;
  let initialState = stateBuilder();

  return {
    givenUUID(uuid: string) {
      uuidProvider.givenUUID(uuid);
    },
    givenItemsInFolder: (folderId: string | undefined, items: Item[]) => {
      itemsGateway.givenItemsInFolder(folderId, items);
    },
    givenExistingItems: (items: ItemModel[]) => {
      initialState = initialState.withItems(items);
    },
    givenItems: (item: Item[]) => {
      itemsGateway.givenItems(item);
    },
    givenAddedItemInFolder: (
      payload: AddItemInFolderPayload,
      itemAdded: Item,
    ) => {
      itemsGateway.givenAddedItemInFolder(payload, itemAdded);
    },
    whenGetItemById: (id: string) => {
      store = createTestStore({ itemsGateway });
      return store.dispatch(getItemByIdUseCase(id));
    },
    whenGetItemsInFolder: (folderId: string | undefined) => {
      store = createTestStore({ itemsGateway });
      return store.dispatch(getItemsInFolderUseCase(folderId));
    },
    whenAddItemInFolder: (payload: AddItemInFolderUseCasePayload) => {
      store = createTestStore({ itemsGateway, uuidProvider });
      return store.dispatch(addItemInFolderUseCase(payload));
    },
    whenEditNote: (payload: EditItemNoteUseCasePayload) => {
      store = createTestStore({ itemsGateway }, initialState.build());
      return store.dispatch(editItemNoteUseCase(payload));
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
    thenNoteShouldBeenEdited: (payload: EditNotePayload) => {
      expect(itemsGateway.lastNoteEdit).toEqual(payload);
    },
    thenItemsIs: (items: ExpectedItem[]) => {
      expect(store.getState()).toEqual(
        stateBuilder()
          .withItems(
            items.map((item) => ({
              ...item,
              tags: item.tags.map((t) => t.id),
            })),
          )
          .withTags(items.flatMap((i) => i.tags))
          .withNotLoadingItem(items.map((i) => i.id))
          .build(),
      );
    },
    thenFoldersItemsIs: (
      folderId: string | undefined,
      items: ExpectedItem[],
    ) => {
      expect(store.getState()).toEqual(
        stateBuilder()
          .withItems(
            items.map((item) => ({
              ...item,
              tags: item.tags.map((t) => t.id),
            })),
          )
          .withTags(items.flatMap((i) => i.tags))
          .withNotLoadingFoldersItems([folderId ?? 'root'])
          .build(),
      );
    },
  };
};

export type ItemsFixture = ReturnType<typeof createItemsFixture>;
