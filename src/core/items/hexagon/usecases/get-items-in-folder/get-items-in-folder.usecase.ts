import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export const getItemsInFolderUseCase = createAppAsyncThunk(
  'items/getItemsInFolder',
  async (folderId: string | undefined, { extra: { itemsGateway } }) => {
    return itemsGateway.getFromFolder(folderId);
  },
);
