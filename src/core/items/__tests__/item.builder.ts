import { ItemModel } from '../hexagon/models/item.model';

export const itemBuilder = (
  props: ItemModel = {
    id: 'item-id',
    name: 'Iphone 13 pro max',
    quantity: 1,
    description: 'description',
    folderId: undefined,
    createdAt: '2024-01-01',
  },
) => ({
  withId: (id: string) => itemBuilder({ ...props, id }),
  withName: (name: string) => itemBuilder({ ...props, name }),
  withQuantity: (quantity: number) => itemBuilder({ ...props, quantity }),
  withDescription: (description: string) =>
    itemBuilder({ ...props, description }),
  createdAt: (createdAt: Date) =>
    itemBuilder({ ...props, createdAt: createdAt.toISOString() }),
  withFolderId: (folderId: string | undefined) =>
    itemBuilder({ ...props, folderId }),
  build: () => props,
});
