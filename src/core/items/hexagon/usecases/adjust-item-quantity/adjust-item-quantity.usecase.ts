import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type AdjustItemQuantityUseCasePayload = {
  itemId: string;
  quantity: number;
};

export const adjustItemQuantityUseCase = createAppAsyncThunk(
  'items/adjustQuantity',
  async ({ itemId, quantity }: AdjustItemQuantityUseCasePayload) => {},
);
