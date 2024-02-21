import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export const deleteItemImageUseCase = createAppAsyncThunk(
  'items/deleteImage',
  async (itemId: string, { extra: { itemsGateway } }) => {
    await itemsGateway.deleteImage(itemId);
  },
);
