import { ItemModel } from '../hexagon/models/item.model';
import { Barcode } from '../hexagon/models/barcode';

export const itemBuilder = (
  props: ItemModel = {
    id: 'item-id',
    name: 'Iphone 13 pro max',
    quantity: 1,
    note: 'note',
    folderId: null,
    tags: [],
    createdAt: '2024-01-01',
  },
) => ({
  withId: (id: string) => itemBuilder({ ...props, id }),
  withName: (name: string) => itemBuilder({ ...props, name }),
  withQuantity: (quantity: number) => itemBuilder({ ...props, quantity }),
  withNote: (description: string) =>
    itemBuilder({ ...props, note: description }),
  createdAt: (createdAt: Date) =>
    itemBuilder({ ...props, createdAt: createdAt.toISOString() }),
  withFolderId: (folderId: string | null) =>
    itemBuilder({ ...props, folderId }),
  withTags: (tags: string[]) => itemBuilder({ ...props, tags }),
  withBarcode: (barcode: Barcode) => itemBuilder({ ...props, barcode }),
  build: () => props,
});
