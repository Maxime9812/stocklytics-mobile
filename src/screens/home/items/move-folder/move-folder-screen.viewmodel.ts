import { createSelector } from '@reduxjs/toolkit';
import { AppDispatch } from '../../../../core/create-store';
import { selectFolderById } from '../../../../core/folders/folders.slice';
import { moveFolderUseCase } from '../../../../core/folders/hexagon/usecases/move-folder/move-folder.usecase';

type Params = {
  folderId: string;
  dispatch: AppDispatch;
  selectedFolderId?: string | 'root';
};

export const createMoveFolderScreenViewModel = ({
  folderId,
  dispatch,
  selectedFolderId,
}: Params) =>
  createSelector([selectFolderById(folderId)], (folder) => {
    const moveFolder = async () => {
      const parentId =
        selectedFolderId === 'root' ? undefined : selectedFolderId;
      return dispatch(moveFolderUseCase({ folderId, parentId }));
    };

    const canSubmit = !!selectedFolderId;

    const folderName = folder.name;

    return { moveFolder, canSubmit, folderName };
  });
