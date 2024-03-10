import { createSelector } from '@reduxjs/toolkit';
import { selectFolderById } from '../../../../../../../core/folders/folders.slice';

export const createFolderScreenHeaderRightViewModel = (folderId: string = '') =>
  createSelector([selectFolderById(folderId)], (folder) => {
    const isRoot = !folderId;

    if (isRoot) {
      return {
        folderName: 'folder.rootName',
      };
    }

    return {
      folderName: folder?.name,
    };
  });
