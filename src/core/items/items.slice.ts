import { createSlice } from '@reduxjs/toolkit';
import { itemsAdapter, ItemsEntityState } from './hexagon/models/item.model';
import { getItemByIdUseCase } from './hexagon/usecases/get-item-by-id/get-item-by-id.usecase';
import { getItemsInFolderUseCase } from './hexagon/usecases/get-items-in-folder/get-items-in-folder.usecase';
import { RootState } from '../create-store';

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
        state.isLoadingById[action.meta.arg] = false;
        if (!item) return;
        itemsAdapter.upsertOne(state, item);
        state.isLoadingById[item.id] = false;
      })
      .addCase(getItemByIdUseCase.pending, (state, action) => {
        state.isLoadingById[action.meta.arg] = true;
      })
      .addCase(getItemsInFolderUseCase.fulfilled, (state, action) => {
        const items = action.payload;
        state.isLoadingFoldersItemsById[action.meta.arg ?? 'root'] = false;
        itemsAdapter.upsertMany(state, items);
      })
      .addCase(getItemsInFolderUseCase.pending, (state, action) => {
        state.isLoadingFoldersItemsById[action.meta.arg ?? 'root'] = true;
      });
  },
});

export const folderItemsIsLoadingSelector =
  (state: RootState) => (folderId: string | null) =>
    state.items.isLoadingFoldersItemsById[folderId ?? 'root'] ?? false;

export const itemsInFolderSelector =
  (state: RootState) => (folderId: string | null) =>
    itemsAdapter
      .getSelectors()
      .selectAll(state.items)
      .filter((item) => item.folderId === folderId);
