import { createSelector } from '@reduxjs/toolkit';
import { AppDispatch } from '../../../../../core/create-store';
import { selectItemById } from '../../../../../core/items/items.slice';
import { deleteItemUseCase } from '../../../../../core/items/hexagon/usecases/delete-item/delete-item.usecase';

type DeleteItemScreenViewModelParams = {
  itemId: string;
  dispatch: AppDispatch;
};

export const createDeleteItemScreenViewModel = ({
  itemId,
  dispatch,
}: DeleteItemScreenViewModelParams) =>
  createSelector([selectItemById(itemId)], (item) => {
    const deleteItem = async () => {
      return dispatch(deleteItemUseCase({ itemId }));
    };

    return {
      deleteItem,
      item: {
        name: item?.name,
      },
    };
  });
