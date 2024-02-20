import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export const deleteItemImageUseCase = createAppAsyncThunk(
  'items/deleteImage',
  async (itemId: string) => {},
);
