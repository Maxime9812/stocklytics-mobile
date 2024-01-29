import { ItemModel } from '../models/item.model';

export interface ItemsGateway {
  getFromFolder(folderId: string): Promise<ItemModel[]>;
}
