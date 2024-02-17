import { createSelector } from '@reduxjs/toolkit';
import { AppDispatch } from '../../../../../core/create-store';
import { editItemNameUseCase } from '../../../../../core/items/hexagon/usecases/edit-item-name/edit-item-name.usecase';
import { selectItemById } from '../../../../../core/items/items.slice';

type EditItemNameScreenViewModelParams = {
  itemId: string;
  dispatch: AppDispatch;
};

export const createEditItemNameScreenViewModel = ({
  itemId,
  dispatch,
}: EditItemNameScreenViewModelParams) =>
  createSelector([selectItemById(itemId)], (item) => {
    const name = item?.name;
    const editName = async (name: string) => {
      return dispatch(editItemNameUseCase({ itemId, name }));
    };
    return {
      editName,
      name,
    };
  });
