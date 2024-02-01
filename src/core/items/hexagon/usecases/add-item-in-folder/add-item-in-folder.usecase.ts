import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type AddItemInFolderUseCasePayload = {
  name: string;
  quantity: number;
  folderId?: string;
};

export const addItemInFolderUseCase = createAppAsyncThunk(
  'items/addItemInFolder',
  (
    payload: AddItemInFolderUseCasePayload,
    { extra: { itemsGateway, uuidProvider } },
  ) => {
    return itemsGateway.addItemInFolder({
      id: uuidProvider.generate(),
      ...payload,
    });
  },
);
