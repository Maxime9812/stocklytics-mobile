import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type MoveFolderUseCasePayload = {
  folderId: string;
  parentId?: string;
};

export const moveFolderUseCase = createAppAsyncThunk(
  'folders/move',
  async (payload: MoveFolderUseCasePayload, { extra: { foldersGateway } }) => {
    await foldersGateway.move({
      id: payload.folderId,
      parentId: payload.parentId,
    });
  },
);
