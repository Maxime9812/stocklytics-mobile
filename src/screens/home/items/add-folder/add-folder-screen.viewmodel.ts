import { AppDispatch, RootState } from '../../../../core/create-store';

import { createSelector } from '@reduxjs/toolkit';

import { selectFolderById } from '../../../../core/folders/folders.slice';
import {
  addFolderUseCase,
  AddFolderUseCasePayload,
} from '../../../../core/folders/hexagon/usecases/add-folder/add-folder.usecase';

type CreateItemScreenViewModelParams = {
  parentId?: string;
  dispatch: AppDispatch;
};

export const createAddFolderScreenViewModel = ({
  parentId,
  dispatch,
}: CreateItemScreenViewModelParams) =>
  createSelector(
    [
      (state: RootState) => {
        if (!parentId) return;
        return selectFolderById(parentId)(state);
      },
    ],
    (folder) => {
      const addFolder = (payload: AddFolderUseCasePayload) =>
        dispatch(addFolderUseCase({ ...payload, parentId }));

      const folderName = folder?.name ?? 'Root';

      return {
        folderName,
        addFolder,
      };
    },
  );
