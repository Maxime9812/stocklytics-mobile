import { ItemModel } from '../models/item.model';

export interface ItemsGateway {
  getFromFolder(folderId: string | undefined): Promise<ItemModel[]>;
  getById(id: string): Promise<ItemModel | undefined>;
}
