import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type DeleteItemUseCasePayload = {
  itemId: string;
};
export const deleteItemUseCase = createAppAsyncThunk(
  'items/delete',
  ({}: DeleteItemUseCasePayload) => {},
);
