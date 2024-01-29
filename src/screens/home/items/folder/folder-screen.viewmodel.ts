import { RootState } from '../../../../core/create-store';
import {
  folderIsLoadingSelector,
  itemsInFolderSelector,
} from '../../../../core/items/items.slice';

export type FolderScreenViewModelParams = {
  folderId?: string;
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
      stats: {
        totalItems: number;
        totalQuantity: number;
      };
    };

export const createFolderScreenViewModel =
  (state: RootState) =>
  ({ folderId }: FolderScreenViewModelParams): FolderScreenViewModelState => {
    const isLoading = folderIsLoadingSelector(state)(folderId);

    if (isLoading)
      return {
        type: 'loading',
      };

    const items = itemsInFolderSelector(state)(folderId);

    return {
      type: 'loaded',
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
      })),
      stats: {
        totalItems: items.length,
        totalQuantity: items.reduce((acc, item) => acc + item.quantity, 0),
      },
    };
  };
