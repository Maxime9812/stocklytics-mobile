import { AppDispatch } from '../../../../core/create-store';
import { deleteItemUseCase } from '../../../../core/items/hexagon/usecases/delete-item/delete-item.usecase';
import { selectItemById } from '../../../../core/items/items.slice';
import { createSelector } from '@reduxjs/toolkit';

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
