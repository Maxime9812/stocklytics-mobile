import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type AddFolderUseCasePayload = {
  name: string;
  parentId?: string;
};

export const addFolderUseCase = createAppAsyncThunk(
  'folders/addFolder',
  async (
    payload: AddFolderUseCasePayload,
    { extra: { foldersGateway, uuidProvider }, rejectWithValue },
  ) => {
    const folder = await foldersGateway.addFolder({
      ...payload,
      id: uuidProvider.generate(),
    });
    if (!folder) return rejectWithValue('Error adding folder');
    return folder;
  },
);
