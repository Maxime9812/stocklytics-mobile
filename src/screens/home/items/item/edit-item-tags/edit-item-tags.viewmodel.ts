import { createSelector } from '@reduxjs/toolkit';
import { AppDispatch } from '../../../../../core/create-store';
import { selectItemById } from '../../../../../core/items/items.slice';
import { selectTags } from '../../../../../core/tags/tags.slice';

type EditItemTagsViewModelParams = {
  itemId: string;
  dispatch: AppDispatch;
};

export const createEditItemTagsViewModel = ({
  itemId,
  dispatch,
}: EditItemTagsViewModelParams) =>
  createSelector([selectItemById(itemId), selectTags], (item, selectTags) => {
    return { tags: item?.tags };
  });
