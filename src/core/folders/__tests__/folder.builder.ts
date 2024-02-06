import { FolderModel } from '../hexagon/models/folder.model';

export const folderBuilder = (
  model: FolderModel = {
    id: 'folder-id',
    name: 'folder-name',
    createdAt: new Date('2024-01-01').toISOString(),
    parentId: null,
    itemQuantity: 0,
  },
) => {
  return {
    withId: (id: string) => folderBuilder({ ...model, id }),
    withName: (name: string) => folderBuilder({ ...model, name }),
    createdAt: (createdAt: Date) =>
      folderBuilder({ ...model, createdAt: createdAt.toISOString() }),
    withParentId: (parentId: string) => folderBuilder({ ...model, parentId }),
    withItemQuantity: (itemQuantity: number) =>
      folderBuilder({ ...model, itemQuantity }),
    build: () => model,
  };
};
