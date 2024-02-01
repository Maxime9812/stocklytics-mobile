import {
  AddItemInFolderPayload,
  ItemsGateway,
} from '../../hexagon/gateways/items.gateway';
import { ItemModel } from '../../hexagon/models/item.model';

export class StubItemsGateway implements ItemsGateway {
  private itemsInFolder: Map<string, ItemModel[]> = new Map();
  private itemsById: Map<string, ItemModel> = new Map();
  private addedItems: Map<string, ItemModel> = new Map();

  constructor(private readonly delay = 0) {}

  async addItemInFolder(payload: AddItemInFolderPayload): Promise<ItemModel> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.addedItems.get(this.getAddedItemInFolderKey(payload))!);
      }, this.delay);
    });
  }
  async getFromFolder(folderId: string | undefined): Promise<ItemModel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.itemsInFolder.get(folderId ?? 'root') ?? []);
      }, this.delay);
    });
  }

  async getById(id: string): Promise<ItemModel | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.itemsById.get(id));
      }, this.delay);
    });
  }

  givenItemsInFolder(folderId: string | undefined, items: ItemModel[]) {
    this.itemsInFolder.set(folderId ?? 'root', items);
  }

  givenItems(items: ItemModel[]) {
    items.forEach((item) => this.itemsById.set(item.id, item));
  }

  givenAddedItemInFolder(
    payload: AddItemInFolderPayload,
    itemAdded: ItemModel,
  ) {
    this.addedItems.set(this.getAddedItemInFolderKey(payload), itemAdded);
  }

  private getAddedItemInFolderKey(payload: AddItemInFolderPayload) {
    return JSON.stringify(payload);
  }
}
