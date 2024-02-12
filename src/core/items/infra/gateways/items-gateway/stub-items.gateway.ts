import {
  AddItemInFolderPayload,
  EditNotePayload,
  Item,
  ItemsGateway,
  LinkBarcodeToItemPayload,
} from '../../../hexagon/gateways/items.gateway';

export class StubItemsGateway implements ItemsGateway {
  private itemsInFolder: Map<string, Item[]> = new Map();
  private itemsById: Map<string, Item> = new Map();
  private addedItems: Map<string, Item> = new Map();
  lastNoteEdit: EditNotePayload | undefined;
  lastBarcodeLink: LinkBarcodeToItemPayload | undefined;
  lastDeletedItemId: string | undefined;
  lastUnlinkedItemId: string | undefined;

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

  async editNote(payload: EditNotePayload): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.lastNoteEdit = payload;
        resolve();
      }, this.delay);
    });
  }

  async linkBarcode(payload: LinkBarcodeToItemPayload): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.lastBarcodeLink = payload;
        resolve();
      }, this.delay);
    });
  }

  async unlinkBarcode(itemId: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.lastUnlinkedItemId = itemId;
        resolve();
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

  async delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.lastDeletedItemId = id;
        resolve();
      }, this.delay);
    });
  }
}
