import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export const getItemByIdUseCase = createAppAsyncThunk(
  'items/getItemById',
  async (id: string, { extra: { itemsGateway } }) => {
    return itemsGateway.getById(id);
  },
);
