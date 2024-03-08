import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export const getAllTagsUseCase = createAppAsyncThunk(
  'tags/getAll',
  async (_, { extra: { tagsGateway } }) => {
    return tagsGateway.getAll();
  },
);
