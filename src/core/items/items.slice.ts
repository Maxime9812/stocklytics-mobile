import { createSelector, createSlice } from '@reduxjs/toolkit';
import { itemsAdapter, ItemsEntityState } from './hexagon/models/item.model';
import { getItemByIdUseCase } from './hexagon/usecases/get-item-by-id/get-item-by-id.usecase';
import { getItemsInFolderUseCase } from './hexagon/usecases/get-items-in-folder/get-items-in-folder.usecase';
import { RootState } from '../create-store';
import { addItemInFolderUseCase } from './hexagon/usecases/add-item-in-folder/add-item-in-folder.usecase';
import { editItemNoteUseCase } from './hexagon/usecases/edit-item-note/edit-item-note.usecase';
import {
  linkBarcodeToItemError,
  linkBarcodeToItemUseCase,
} from './hexagon/usecases/link-barcode-to-item/link-barcode-to-item.usecase';
import { deleteItemUseCase } from './hexagon/usecases/delete-item/delete-item.usecase';
import { unlinkItemBarcodeUseCase } from './hexagon/usecases/unlink-item-barcode/unlink-item-barcode.usecase';
import { editItemNameUseCase } from './hexagon/usecases/edit-item-name/edit-item-name.usecase';
import { LinkBarcodeError } from './hexagon/gateways/items.gateway';
import { deleteItemImageUseCase } from './hexagon/usecases/delete-item-image/delete-item-image.usecase';
import { addImageToItemUseCase } from './hexagon/usecases/add-image-to-item/add-image-to-item.usecase';
import { adjustItemQuantityUseCase } from './hexagon/usecases/adjust-item-quantity/adjust-item-quantity.usecase';
import { setItemTagsUseCase } from './hexagon/usecases/set-item-tags/set-item-tags.usecase';
import { moveItemUseCase } from './hexagon/usecases/move-item/move-item.usecase';

export type ItemsSliceState = ItemsEntityState & {
  isLoadingById: Record<string, boolean>;
  isLoadingFoldersItemsById: Record<string, boolean>;
  linkBarcodeErrors: Record<string, LinkBarcodeError>;
  isLinkingBarcode: Record<string, boolean>;
};

const initialState: ItemsSliceState = itemsAdapter.getInitialState({
  isLoadingById: {},
  isLoadingFoldersItemsById: {},
  linkBarcodeErrors: {},
  isLinkingBarcode: {},
});

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItemByIdUseCase.fulfilled, (state, action) => {
        const item = action.payload;
        delete state.isLoadingById[action.meta.arg];
        if (!item) return;
        itemsAdapter.upsertOne(state, {
          ...item,
          tags: item.tags.map((t) => t.id),
        });
      })
      .addCase(getItemByIdUseCase.pending, (state, action) => {
        state.isLoadingById[action.meta.arg] = true;
      })
      .addCase(getItemsInFolderUseCase.fulfilled, (state, action) => {
        const items = action.payload;
        delete state.isLoadingFoldersItemsById[action.meta.arg ?? 'root'];
        itemsAdapter.upsertMany(
          state,
          items.map((item) => ({ ...item, tags: item.tags.map((t) => t.id) })),
        );
      })
      .addCase(getItemsInFolderUseCase.pending, (state, action) => {
        state.isLoadingFoldersItemsById[action.meta.arg ?? 'root'] = true;
      })
      .addCase(addItemInFolderUseCase.fulfilled, (state, action) => {
        const item = action.payload;
        itemsAdapter.upsertOne(state, {
          ...item,
          tags: item.tags.map((t) => t.id),
        });
        delete state.isLoadingById[item.id];
      })
      .addCase(editItemNoteUseCase.fulfilled, (state, action) => {
        const { itemId, note } = action.payload;
        itemsAdapter.updateOne(state, {
          id: itemId,
          changes: { note },
        });
      })
      .addCase(linkBarcodeToItemUseCase.fulfilled, (state, action) => {
        const { itemId, barcode } = action.payload;
        itemsAdapter.updateOne(state, {
          id: itemId,
          changes: { barcode },
        });
        delete state.isLinkingBarcode[itemId];
      })
      .addCase(linkBarcodeToItemUseCase.pending, (state, action) => {
        state.isLinkingBarcode[action.meta.arg.itemId] = true;
        delete state.linkBarcodeErrors[action.meta.arg.itemId];
      })
      .addCase(linkBarcodeToItemError, (state, action) => {
        const { itemId, error } = action.payload;
        state.linkBarcodeErrors[itemId] = error;
        delete state.isLinkingBarcode[itemId];
      })
      .addCase(deleteItemUseCase.fulfilled, (state, action) => {
        itemsAdapter.removeOne(state, action.meta.arg.itemId);
      })
      .addCase(unlinkItemBarcodeUseCase.fulfilled, (state, action) => {
        itemsAdapter.updateOne(state, {
          id: action.meta.arg,
          changes: { barcode: undefined },
        });
      })
      .addCase(editItemNameUseCase.fulfilled, (state, action) => {
        const { itemId, name } = action.meta.arg;
        itemsAdapter.updateOne(state, {
          id: itemId,
          changes: { name },
        });
      })
      .addCase(deleteItemImageUseCase.fulfilled, (state, action) => {
        itemsAdapter.updateOne(state, {
          id: action.meta.arg,
          changes: { imageUrl: undefined },
        });
      })
      .addCase(addImageToItemUseCase.fulfilled, (state, action) => {
        itemsAdapter.updateOne(state, {
          id: action.meta.arg.itemId,
          changes: { imageUrl: action.payload },
        });
      })
      .addCase(adjustItemQuantityUseCase.fulfilled, (state, action) => {
        itemsAdapter.updateOne(state, {
          id: action.meta.arg.itemId,
          changes: { quantity: action.payload },
        });
      })
      .addCase(setItemTagsUseCase.fulfilled, (state, action) => {
        itemsAdapter.updateOne(state, {
          id: action.meta.arg.itemId,
          changes: { tags: action.meta.arg.tagIds },
        });
      })
      .addCase(moveItemUseCase.fulfilled, (state, action) => {
        const { itemId, folderId } = action.meta.arg;
        itemsAdapter.updateOne(state, {
          id: itemId,
          changes: { folderId },
        });
      });
  },
});

const itemsSelectors = itemsAdapter.getSelectors<RootState>(
  (state) => state.items,
);

export const selectFolderItemsIsLoading =
  (folderId: string | null) => (state: RootState) =>
    state.items.isLoadingFoldersItemsById[folderId ?? 'root'] ?? false;

export const selectItemsInFolder = (folderId: string | null) =>
  createSelector([itemsSelectors.selectAll], (items) =>
    items.filter((item) => item.folderId === folderId),
  );

export const selectItemById = (id: string) => (state: RootState) =>
  itemsSelectors.selectById(state, id);

export const selectItemIsLoading = (id: string) => (state: RootState) =>
  state.items.isLoadingById[id] ?? false;
