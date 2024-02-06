import { createSelector } from '@reduxjs/toolkit';
import { selectItemById } from '../../../../core/items/items.slice';
import { RootState } from '../../../../core/create-store';
import { selectTags } from '../../../../core/tags/tags.slice';

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
    tags: {
      id: string;
      name: string;
    }[];
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
  createSelector([selectItemById(itemId), selectTags], (item, selectTags) => {
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
        tags: selectTags(item.tags).map((tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        quantity: item.quantity,
        createdAt: new Date(item.createdAt),
        hasNote: !!item.note,
      },
    };
  });
