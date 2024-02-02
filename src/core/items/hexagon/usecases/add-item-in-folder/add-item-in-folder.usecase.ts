import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type AddItemInFolderUseCasePayload = {
  name: string;
  quantity: number;
  folderId?: string;
};

export const addItemInFolderUseCase = createAppAsyncThunk(
  'items/addItemInFolder',
  async (
    payload: AddItemInFolderUseCasePayload,
    { extra: { itemsGateway, uuidProvider }, rejectWithValue },
  ) => {
    const item = await itemsGateway.addItemInFolder({
      id: uuidProvider.generate(),
      ...payload,
    });
    if (!item) return rejectWithValue('Error adding item');
    return item;
  },
);
