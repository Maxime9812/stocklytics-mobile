import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type CreateTagUseCasePayload = {
  id: string;
  name: string;
};

export const createTagUseCase = createAppAsyncThunk(
  'tags/create',
  async (payload: CreateTagUseCasePayload, { extra: { tagsGateway } }) => {
    await tagsGateway.createTag(payload);
    return payload;
  },
);
