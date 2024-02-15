import { createSelector, createSlice } from '@reduxjs/toolkit';
import { itemsAdapter, ItemsEntityState } from './hexagon/models/item.model';
import { getItemByIdUseCase } from './hexagon/usecases/get-item-by-id/get-item-by-id.usecase';
import { getItemsInFolderUseCase } from './hexagon/usecases/get-items-in-folder/get-items-in-folder.usecase';
import { RootState } from '../create-store';
import { addItemInFolderUseCase } from './hexagon/usecases/add-item-in-folder/add-item-in-folder.usecase';
import { editItemNoteUseCase } from './hexagon/usecases/edit-item-note/edit-item-note.usecase';
import { linkBarcodeToItemUseCase } from './hexagon/usecases/link-barcode-to-item/link-barcode-to-item.usecase';
import { deleteItemUseCase } from './hexagon/usecases/delete-item/delete-item.usecase';
import { unlinkItemBarcodeUseCase } from './hexagon/usecases/unlink-item-barcode/unlink-item-barcode.usecase';

export type ItemsSliceState = ItemsEntityState & {
  isLoadingById: Record<string, boolean>;
  isLoadingFoldersItemsById: Record<string, boolean>;
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState: itemsAdapter.getInitialState({
    isLoadingById: {},
    isLoadingFoldersItemsById: {},
  }) as ItemsSliceState,
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
      })
      .addCase(deleteItemUseCase.fulfilled, (state, action) => {
        itemsAdapter.removeOne(state, action.meta.arg.itemId);
      })
      .addCase(unlinkItemBarcodeUseCase.fulfilled, (state, action) => {
        itemsAdapter.updateOne(state, {
          id: action.meta.arg,
          changes: { barcode: undefined },
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
