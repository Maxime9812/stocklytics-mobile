import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export const getFoldersInFolderUseCase = createAppAsyncThunk(
  'folders/getFoldersInFolder',
  async (folderId: string | undefined, { extra: { foldersGateway } }) => {
    return foldersGateway.getInFolder(folderId ?? null);
  },
);
