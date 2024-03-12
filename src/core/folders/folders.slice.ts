import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  folderAdapter,
  FolderEntityState,
} from './hexagon/models/folder.model';
import { getFoldersInFolderUseCase } from './hexagon/usecases/get-folders-in-folder/get-folders-in-folder.usecase';
import { RootState } from '../create-store';
import { addFolderUseCase } from './hexagon/usecases/add-folder/add-folder.usecase';
import { deleteFolderUseCase } from './hexagon/usecases/delete-folder/delete-folder.usecase';

export type FolderSliceState = FolderEntityState & {
  foldersInFolderLoading: Record<string, boolean>;
};

const initialState: FolderSliceState = folderAdapter.getInitialState({
  foldersInFolderLoading: {},
});
export const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFoldersInFolderUseCase.fulfilled, (state, action) => {
        folderAdapter.upsertMany(state, action.payload);
        delete state.foldersInFolderLoading[action.meta.arg ?? 'root'];
      })
      .addCase(getFoldersInFolderUseCase.pending, (state, action) => {
        state.foldersInFolderLoading[action.meta.arg ?? 'root'] = true;
      })
      .addCase(addFolderUseCase.fulfilled, (state, action) => {
        folderAdapter.addOne(state, action.payload);
      })
      .addCase(deleteFolderUseCase.fulfilled, (state, action) => {
        folderAdapter.removeOne(state, action.meta.arg);
      });
  },
});

const folderSelectors = folderAdapter.getSelectors<RootState>(
  (state) => state.folders,
);

export const selectFolderFoldersIsLoading =
  (folderId: string | null) => (state: RootState) =>
    state.folders.foldersInFolderLoading[folderId ?? 'root'] ?? false;

export const selectFoldersInFolder = (folderId: string | null) =>
  createSelector([folderSelectors.selectAll], (folders) =>
    folders.filter((folder) => folder.parentId === folderId),
  );

export const createSelectFoldersInFolder = createSelector(
  [folderSelectors.selectAll],
  (folders) => (folderId: string | null) =>
    folders.filter((folder) => folder.parentId === folderId),
);

export const selectFolderById = (id: string) => (state: RootState) =>
  folderSelectors.selectById(state, id);

export const createSelectFolderById = createSelector(
  [folderSelectors.selectAll],
  (folders) => (id: string) => folders.find((f) => f.id === id),
);
