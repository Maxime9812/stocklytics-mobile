import { ItemModel } from '../models/item.model';

export type AddItemInFolderPayload = {
  id: string;
  name: string;
  quantity: number;
  folderId?: string;
};

export interface ItemsGateway {
  getFromFolder(folderId: string | undefined): Promise<ItemModel[]>;
  getById(id: string): Promise<ItemModel | undefined>;
  addItemInFolder(payload: AddItemInFolderPayload): Promise<ItemModel>;
}
