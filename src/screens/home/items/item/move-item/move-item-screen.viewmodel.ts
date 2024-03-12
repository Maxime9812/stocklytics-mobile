import { createSelector } from '@reduxjs/toolkit';
import { selectItemById } from '../../../../../core/items/items.slice';
import { AppDispatch } from '../../../../../core/create-store';
import { moveItemUseCase } from '../../../../../core/items/hexagon/usecases/move-item/move-item.usecase';

type MoveItemScreenViewModelParams = {
  itemId: string;
  selectedFolderId?: string;
  dispatch: AppDispatch;
};
export const createMoveItemScreenViewModel = ({
  itemId,
  selectedFolderId,
  dispatch,
}: MoveItemScreenViewModelParams) =>
  createSelector([selectItemById(itemId)], (item) => {
    const moveItem = () => {
      if (!selectedFolderId) return;
      return dispatch(moveItemUseCase({ itemId, folderId: selectedFolderId }));
    };

    return {
      itemName: item.name,
      canSubmit: !!selectedFolderId,
      moveItem,
    };
  });
