import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type SetItemTagsUseCasePayload = {
  itemId: string;
  tagIds: string[];
};

export const setItemTagsUseCase = createAppAsyncThunk(
  'items/setTags',
  async (
    { itemId, tagIds }: SetItemTagsUseCasePayload,
    { extra: { itemsGateway } },
  ) => {
    await itemsGateway.setTags(itemId, tagIds);
  },
);
