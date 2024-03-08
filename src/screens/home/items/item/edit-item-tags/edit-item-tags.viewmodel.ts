import { createSelector } from '@reduxjs/toolkit';
import { AppDispatch } from '../../../../../core/create-store';
import { selectItemById } from '../../../../../core/items/items.slice';
import { selectTags } from '../../../../../core/tags/tags.slice';
import { setItemTagsUseCase } from '../../../../../core/items/hexagon/usecases/set-item-tags/set-item-tags.usecase';

type EditItemTagsViewModelParams = {
  itemId: string;
  dispatch: AppDispatch;
};

export const createEditItemTagsViewModel = ({
  itemId,
  dispatch,
}: EditItemTagsViewModelParams) =>
  createSelector([selectItemById(itemId), selectTags], (item, selectTags) => {
    const setTags = (tagIds: string[]) => {
      return dispatch(setItemTagsUseCase({ itemId, tagIds }));
    };
    return { tags: item?.tags, setTags };
  });
