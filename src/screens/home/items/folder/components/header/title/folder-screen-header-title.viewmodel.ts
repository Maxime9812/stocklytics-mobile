import { createSelector } from '@reduxjs/toolkit';
import { selectFolderById } from '../../../../../../../core/folders/folders.slice';

type FolderScreenHeaderTitleViewModelParams = {
  folderId?: string;
};

export const createFolderScreenHeaderTitleViewModel = ({
  folderId = '',
}: FolderScreenHeaderTitleViewModelParams) =>
  createSelector([selectFolderById(folderId)], (folder) => {
    const isRoot = folderId == '';
    const name = folder?.name;

    return { isRoot, name };
  });
