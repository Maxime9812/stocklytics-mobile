import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type AddFolderUseCasePayload = {
  name: string;
  parentId?: string;
};

export const addFolderUseCase = createAppAsyncThunk(
  'folders/addFolder',
  async (payload: AddFolderUseCasePayload) => {},
);
