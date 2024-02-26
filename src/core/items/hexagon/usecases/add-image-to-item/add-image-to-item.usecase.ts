import { createAppAsyncThunk } from '../../../../create-app-async-thunk';

export type AddImageToItemUseCasePayload = {
  itemId: string;
  imagePath: string;
};

export const addImageToItemUseCase = createAppAsyncThunk(
  'items/addImage',
  async (
    payload: AddImageToItemUseCasePayload,
    { extra: { itemsGateway, uuidProvider } },
  ) => {
    return itemsGateway.addImage({
      itemId: payload.itemId,
      image: {
        id: uuidProvider.generate(),
        path: payload.imagePath,
      },
    });
  },
);
