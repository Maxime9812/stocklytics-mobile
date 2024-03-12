import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type MoveItemUseCasePayload = {
  itemId: string;
  folderId?: string;
};

export const moveItemUseCase = createAppAsyncThunk(
  'items/move',
  async (payload: MoveItemUseCasePayload, { extra: { itemsGateway } }) => {
    await itemsGateway.moveToFolder(payload);
  },
);
