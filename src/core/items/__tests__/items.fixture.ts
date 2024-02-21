import { ItemModel } from '../hexagon/models/item.model';
import { createTestStore, TestStore } from '../../create-store';
import { getItemByIdUseCase } from '../hexagon/usecases/get-item-by-id/get-item-by-id.usecase';
import { StateBuilder, stateBuilder } from '../../state-builder';
import { StubItemsGateway } from '../infra/gateways/items-gateway/stub-items.gateway';
import { getItemsInFolderUseCase } from '../hexagon/usecases/get-items-in-folder/get-items-in-folder.usecase';
import {
  addItemInFolderUseCase,
  AddItemInFolderUseCasePayload,
} from '../hexagon/usecases/add-item-in-folder/add-item-in-folder.usecase';
import { DeterministicUUIDProvider } from '../../common/uuid-provider/deterministic-uuid.provider';
import {
  AddItemInFolderPayload,
  EditNamePayload,
  EditNotePayload,
  Item,
  LinkBarcodeError,
} from '../hexagon/gateways/items.gateway';
import { Tag } from '../../tags/hexagon/models/tag.model';
import {
  editItemNoteUseCase,
  EditItemNoteUseCasePayload,
} from '../hexagon/usecases/edit-item-note/edit-item-note.usecase';
import {
  linkBarcodeToItemUseCase,
  LinkBarcodeToItemUseCasePayload,
} from '../hexagon/usecases/link-barcode-to-item/link-barcode-to-item.usecase';
import {
  deleteItemUseCase,
  DeleteItemUseCasePayload,
} from '../hexagon/usecases/delete-item/delete-item.usecase';
import { unlinkItemBarcodeUseCase } from '../hexagon/usecases/unlink-item-barcode/unlink-item-barcode.usecase';
import {
  editItemNameUseCase,
  EditItemNameUseCasePayload,
} from '../hexagon/usecases/edit-item-name/edit-item-name.usecase';
import { deleteItemImageUseCase } from '../hexagon/usecases/delete-item-image/delete-item-image.usecase';

type ExpectedItem = Omit<ItemModel, 'tags'> & { tags: Tag[] };

export const createItemsFixture = () => {
  const itemsGateway = new StubItemsGateway();
  const uuidProvider = new DeterministicUUIDProvider();
  let store: TestStore;
  let initialState: StateBuilder = stateBuilder();

  return {
    givenInitialState: (fn: (initialState: StateBuilder) => StateBuilder) => {
      initialState = fn(initialState);
    },
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
    givenLinkBarcodeError: (error: LinkBarcodeError) => {
      itemsGateway.givenLinkBarcodeError(error);
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
    whenLinkBarcode: (payload: LinkBarcodeToItemUseCasePayload) => {
      store = createTestStore({ itemsGateway }, initialState.build());
      return store.dispatch(linkBarcodeToItemUseCase(payload));
    },
    whenDeleteItem: (payload: DeleteItemUseCasePayload) => {
      store = createTestStore({ itemsGateway }, initialState.build());
      return store.dispatch(deleteItemUseCase(payload));
    },
    whenUnlinkBarcode: (itemId: string) => {
      store = createTestStore({ itemsGateway }, initialState.build());
      return store.dispatch(unlinkItemBarcodeUseCase(itemId));
    },
    whenChangeItemName: (payload: EditItemNameUseCasePayload) => {
      store = createTestStore({ itemsGateway }, initialState.build());
      return store.dispatch(editItemNameUseCase(payload));
    },
    whenDeleteItemImage: (itemId: string) => {
      store = createTestStore({ itemsGateway }, initialState.build());
      return store.dispatch(deleteItemImageUseCase(itemId));
    },
    thenUnlinkBarcodeIsRequestedFor: (itemId: string) => {
      expect(itemsGateway.lastUnlinkedItemId).toEqual(itemId);
    },
    thenItemDeletionIsRequested: (id: string) => {
      expect(itemsGateway.lastDeletedItemId).toEqual(id);
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
    thenLinkBarcodeIsSend: (payload: LinkBarcodeToItemUseCasePayload) => {
      expect(itemsGateway.lastBarcodeLink).toEqual(payload);
    },
    thenNoteShouldBeenEdited: (payload: EditNotePayload) => {
      expect(itemsGateway.lastNoteEdit).toEqual(payload);
    },
    thenNameShouldBeChanged: (payload: EditNamePayload) => {
      expect(itemsGateway.lastNameChange).toEqual(payload);
    },
    thenItemImageIsDeleted: (itemId: string) => {
      expect(itemsGateway.lastDeletedItemImageId).toEqual(itemId);
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
    thenStateIs: (callback: (initialState: StateBuilder) => StateBuilder) => {
      expect(store.getState()).toEqual(callback(initialState).build());
    },
  };
};

export type ItemsFixture = ReturnType<typeof createItemsFixture>;
