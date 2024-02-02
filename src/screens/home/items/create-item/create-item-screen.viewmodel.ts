import { AppDispatch, RootState } from '../../../../core/create-store';

import { createSelector } from '@reduxjs/toolkit';
import {
  addItemInFolderUseCase,
  AddItemInFolderUseCasePayload,
} from '../../../../core/items/hexagon/usecases/add-item-in-folder/add-item-in-folder.usecase';
import { selectFolderById } from '../../../../core/folders/folders.slice';

type CreateItemScreenViewModelParams = {
  folderId?: string;
  dispatch: AppDispatch;
};

export const createCreateItemScreenViewModel = ({
  folderId,
  dispatch,
}: CreateItemScreenViewModelParams) =>
  createSelector(
    [
      (state: RootState) => {
        if (!folderId) return;
        return selectFolderById(folderId)(state);
      },
    ],
    (folder) => {
      const addItem = async (payload: AddItemInFolderUseCasePayload) =>
        dispatch(addItemInFolderUseCase({ ...payload, folderId }));

      const folderName = folder?.name ?? 'Root';

      return {
        addItem,
        folderName,
      };
    },
  );
