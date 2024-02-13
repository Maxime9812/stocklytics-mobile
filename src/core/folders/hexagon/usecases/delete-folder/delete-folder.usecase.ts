import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export const deleteFolderUseCase = createAppAsyncThunk(
  'folders/delete',
  async (folderId: string, { extra: { foldersGateway } }) => {
    await foldersGateway.delete(folderId);
  },
);
