import { createSlice } from '@reduxjs/toolkit';
import {
  folderAdapter,
  FolderEntityState,
} from './hexagon/models/folder.model';
import { getFoldersInFolderUseCase } from './hexagon/usecases/get-folders-in-folder/get-folders-in-folder.usecase';
import { RootState } from '../create-store';

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
        folderAdapter.addMany(state, action.payload);
        state.foldersInFolderLoading[action.meta.arg ?? 'root'] = false;
      })
      .addCase(getFoldersInFolderUseCase.pending, (state, action) => {
        state.foldersInFolderLoading[action.meta.arg ?? 'root'] = true;
      });
  },
});

export const folderFoldersIsLoadingSelector =
  (state: RootState) => (folderId?: string) =>
    state.folders.foldersInFolderLoading[folderId ?? 'root'] ?? false;

export const foldersInFolderSelector =
  (state: RootState) => (folderId?: string) =>
    folderAdapter
      .getSelectors()
      .selectAll(state.folders)
      .filter((folder) => folder.parentId === folderId);
