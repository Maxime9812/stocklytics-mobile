import { createSelector } from '@reduxjs/toolkit';
import { AppDispatch } from '../../../../core/create-store';
import { selectFolderById } from '../../../../core/folders/folders.slice';
import { deleteFolderUseCase } from '../../../../core/folders/hexagon/usecases/delete-folder/delete-folder.usecase';

type DeleteFolderScreenViewModelParams = {
  folderId: string;
  dispatch: AppDispatch;
};
export const createDeleteFolderScreenViewModel = ({
  folderId,
  dispatch,
}: DeleteFolderScreenViewModelParams) =>
  createSelector([selectFolderById(folderId)], (folder) => {
    const deleteFolder = async () => {
      return dispatch(deleteFolderUseCase(folderId));
    };

    return {
      deleteFolder,
      folder: {
        name: folder?.name,
      },
    };
  });
