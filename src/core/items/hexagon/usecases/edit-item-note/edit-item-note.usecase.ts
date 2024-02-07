import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type EditItemNoteUseCasePayload = { itemId: string; note: string };

export const editItemNoteUseCase = createAppAsyncThunk(
  'items/editNote',
  async (payload: EditItemNoteUseCasePayload, { extra: { itemsGateway } }) => {
    await itemsGateway.editNote({
      id: payload.itemId,
      note: payload.note,
    });
    return payload;
  },
);
