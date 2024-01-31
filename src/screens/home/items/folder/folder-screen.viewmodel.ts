import { RootState } from '../../../../core/create-store';
import {
  selectFolderItemsIsLoading,
  selectItemsInFolder,
} from '../../../../core/items/items.slice';
import {
  selectFolderFoldersIsLoading,
  selectFoldersInFolder,
} from '../../../../core/folders/folders.slice';
import { createSelector } from '@reduxjs/toolkit';

export type FolderScreenViewModelParams = {
  folderId: string | null;
};

export type FolderScreenViewModelState =
  | {
      type: 'loading';
    }
  | {
      type: 'loaded';
      items: {
        id: string;
        name: string;
        quantity: number;
      }[];
      folders: {
        id: string;
        name: string;
        quantity: number;
      }[];
      stats: {
        totalItems: number;
        totalQuantity: number;
        totalFolders: number;
      };
    };

const selectIsLoading = (folderId: string | null) => (state: RootState) => {
  const itemsIsLoading = selectFolderItemsIsLoading(folderId)(state);
  const foldersIsLoading = selectFolderFoldersIsLoading(folderId)(state);
  return foldersIsLoading || itemsIsLoading;
};

export const createFolderScreenViewModel = ({
  folderId,
}: FolderScreenViewModelParams): ((
  state: RootState,
) => FolderScreenViewModelState) =>
  createSelector(
    [
      selectIsLoading(folderId),
      selectItemsInFolder(folderId),
      selectFoldersInFolder(folderId),
    ],
    (isLoading, items, folders) => {
      const itemsQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
      const foldersItemsQuantity = folders.reduce(
        (acc, folder) => acc + folder.itemQuantity,
        0,
      );
      const totalQuantity = itemsQuantity + foldersItemsQuantity;

      if (isLoading) {
        return {
          type: 'loading',
        };
      }

      return {
        type: 'loaded',
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
        })),
        folders: folders.map((folder) => ({
          id: folder.id,
          name: folder.name,
          quantity: folder.itemQuantity,
        })),
        stats: {
          totalItems: items.length,
          totalQuantity,
          totalFolders: folders.length,
        },
      };
    },
  );
