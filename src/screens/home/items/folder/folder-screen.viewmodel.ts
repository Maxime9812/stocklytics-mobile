import { RootState } from '../../../../core/create-store';
import {
  folderItemsIsLoadingSelector,
  itemsInFolderSelector,
} from '../../../../core/items/items.slice';
import {
  folderFoldersIsLoadingSelector,
  foldersInFolderSelector,
} from '../../../../core/folders/folders.slice';

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

export const createFolderScreenViewModel =
  (state: RootState) =>
  ({
    folderId = null,
  }: FolderScreenViewModelParams): FolderScreenViewModelState => {
    const itemsIsLoading = folderItemsIsLoadingSelector(state)(folderId);
    const foldersIsLoading = folderFoldersIsLoadingSelector(state)(folderId);
    const isLoading = foldersIsLoading || itemsIsLoading;

    if (isLoading)
      return {
        type: 'loading',
      };

    const items = itemsInFolderSelector(state)(folderId);
    const folders = foldersInFolderSelector(state)(folderId);

    const itemsQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    const foldersItemsQuantity = folders.reduce(
      (acc, folder) => acc + folder.itemQuantity,
      0,
    );
    const totalQuantity = itemsQuantity + foldersItemsQuantity;

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
  };
