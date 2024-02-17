import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type EditItemNameUseCasePayload = {
  itemId: string;
  name: string;
};

export const editItemNameUseCase = createAppAsyncThunk(
  'items/editItemName',
  async (payload: EditItemNameUseCasePayload, { extra: { itemsGateway } }) => {
    await itemsGateway.editName(payload);
  },
);
