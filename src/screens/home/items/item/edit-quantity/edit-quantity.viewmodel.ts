import { AppDispatch } from '../../../../../core/create-store';
import { adjustItemQuantityUseCase } from '../../../../../core/items/hexagon/usecases/adjust-item-quantity/adjust-item-quantity.usecase';
import { createSelector } from '@reduxjs/toolkit';
import { selectItemById } from '../../../../../core/items/items.slice';

type EditQuantityViewModelParams = {
  itemId: string;
  dispatch: AppDispatch;
  quantityToAdjust?: number;
};

export const createEditQuantityViewModel = ({
  itemId,
  dispatch,
  quantityToAdjust,
}: EditQuantityViewModelParams) =>
  createSelector([selectItemById(itemId)], (item) => {
    const adjust = async (quantity: number) => {
      return dispatch(adjustItemQuantityUseCase({ itemId, quantity }));
    };

    const currentQuantity = item?.quantity;
    const adjustedQuantity = currentQuantity + (quantityToAdjust ?? 0);
    const itemName = item?.name;

    const canAdjust = adjustedQuantity > 0;

    return { adjust, currentQuantity, adjustedQuantity, itemName, canAdjust };
  });
