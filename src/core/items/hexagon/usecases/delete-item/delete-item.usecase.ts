import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type DeleteItemUseCasePayload = {
  itemId: string;
};
export const deleteItemUseCase = createAppAsyncThunk(
  'items/delete',
  async ({ itemId }: DeleteItemUseCasePayload, { extra: { itemsGateway } }) => {
    await itemsGateway.delete(itemId);
  },
);
