import { createSelector, createSlice } from '@reduxjs/toolkit';
import { itemsAdapter, ItemsEntityState } from './hexagon/models/item.model';
import { getItemByIdUseCase } from './hexagon/usecases/get-item-by-id/get-item-by-id.usecase';
import { getItemsInFolderUseCase } from './hexagon/usecases/get-items-in-folder/get-items-in-folder.usecase';
import { RootState } from '../create-store';
import { addItemInFolderUseCase } from './hexagon/usecases/add-item-in-folder/add-item-in-folder.usecase';

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
      })
      .addCase(addItemInFolderUseCase.fulfilled, (state, action) => {
        const item = action.payload;
        itemsAdapter.upsertOne(state, item);
        state.isLoadingById[item.id] = false;
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
