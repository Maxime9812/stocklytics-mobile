import { createSelector } from '@reduxjs/toolkit';
import { selectItemById } from '../../../../core/items/items.slice';
import { RootState } from '../../../../core/create-store';

export type CreateItemScreenViewModelParams = {
  itemId: string;
};

export type ItemScreenViewModelLoading = {
  type: 'loading';
};

export type ItemScreenViewModelLoaded = {
  type: 'loaded';
  item: {
    id: string;
    name: string;
    note: string;
    quantity: number;
    createdAt: Date;
    hasNote: boolean;
  };
};

export type ItemScreenViewModelState =
  | ItemScreenViewModelLoading
  | ItemScreenViewModelLoaded;
export const createItemScreenViewModel = ({
  itemId,
}: CreateItemScreenViewModelParams): ((
  state: RootState,
) => ItemScreenViewModelState) =>
  createSelector([selectItemById(itemId)], (item) => {
    if (!item) {
      return {
        type: 'loading',
      };
    }

    return {
      type: 'loaded',
      item: {
        id: item.id,
        name: item.name,
        note: item.note,
        quantity: item.quantity,
        createdAt: new Date(item.createdAt),
        hasNote: !!item.note,
      },
    };
  });
