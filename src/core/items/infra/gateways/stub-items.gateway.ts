import {
  AddItemInFolderPayload,
  Item,
  ItemsGateway,
} from '../../hexagon/gateways/items.gateway';

export class StubItemsGateway implements ItemsGateway {
  private itemsInFolder: Map<string, Item[]> = new Map();
  private itemsById: Map<string, Item> = new Map();
  private addedItems: Map<string, Item> = new Map();

  constructor(private readonly delay = 0) {}

  async addItemInFolder(payload: AddItemInFolderPayload): Promise<Item> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.addedItems.get(this.getAddedItemInFolderKey(payload))!);
      }, this.delay);
    });
  }
  async getFromFolder(folderId: string | undefined): Promise<Item[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.itemsInFolder.get(folderId ?? 'root') ?? []);
      }, this.delay);
    });
  }

  async getById(id: string): Promise<Item | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.itemsById.get(id));
      }, this.delay);
    });
  }

  givenItemsInFolder(folderId: string | undefined, items: Item[]) {
    this.itemsInFolder.set(folderId ?? 'root', items);
  }

  givenItems(items: Item[]) {
    items.forEach((item) => this.itemsById.set(item.id, item));
  }

  givenAddedItemInFolder(payload: AddItemInFolderPayload, itemAdded: Item) {
    this.addedItems.set(this.getAddedItemInFolderKey(payload), itemAdded);
  }

  private getAddedItemInFolderKey(payload: AddItemInFolderPayload) {
    return JSON.stringify(payload);
  }
}
