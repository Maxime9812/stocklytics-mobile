import {
  AddItemImagePayload,
  AddItemInFolderPayload,
  AdjustItemQuantityPayload,
  EditNamePayload,
  EditNotePayload,
  Item,
  ItemsGateway,
  LinkBarcodeError,
  LinkBarcodeToItemPayload,
} from '../../../hexagon/gateways/items.gateway';
import { Either, left, right } from 'fp-ts/Either';

export class StubItemsGateway implements ItemsGateway {
  private itemsInFolder: Map<string, Item[]> = new Map();
  private itemsById: Map<string, Item> = new Map();
  private addedItems: Map<string, Item> = new Map();
  private imageUrlAdded: Map<string, string> = new Map();
  lastNoteEdit: EditNotePayload | undefined;
  lastBarcodeLink: LinkBarcodeToItemPayload | undefined;
  lastDeletedItemId: string | undefined;
  lastUnlinkedItemId: string | undefined;
  lastNameChange: EditNamePayload | undefined;
  lastDeletedItemImageId: string | undefined;
  lastTagsSet: { itemId: string; tagIds: string[] } | undefined;
  private linkBarcodeError: LinkBarcodeError | undefined;
  private itemQuantityAdjustment: Map<string, number> = new Map();

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

  async linkBarcode(
    payload: LinkBarcodeToItemPayload,
  ): Promise<Either<LinkBarcodeError, void>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.lastBarcodeLink = payload;
        if (this.linkBarcodeError) {
          return resolve(left(this.linkBarcodeError));
        }
        resolve(right(undefined));
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

  async editName(payload: EditNamePayload): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.lastNameChange = payload;
        resolve();
      }, this.delay);
    });
  }

  async deleteImage(itemId: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.lastDeletedItemImageId = itemId;
        resolve();
      }, this.delay);
    });
  }

  async addImage(payload: AddItemImagePayload): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.imageUrlAdded.get(this.getImageAddedKey(payload))!);
      }, this.delay);
    });
  }

  async setTags(itemId: string, tagIds: string[]): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.lastTagsSet = { itemId, tagIds };
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

  givenLinkBarcodeError(error: LinkBarcodeError) {
    this.linkBarcodeError = error;
  }

  givenImageAdded(payload: AddItemImagePayload, imageUrl: string) {
    this.imageUrlAdded.set(this.getImageAddedKey(payload), imageUrl);
  }

  givenQuantityAdjustment(payload: AdjustItemQuantityPayload, qty: number) {
    this.itemQuantityAdjustment.set(
      this.getQuantityAdjustmentKey(payload),
      qty,
    );
  }

  private getImageAddedKey(payload: AddItemImagePayload) {
    return `${payload.itemId}-${payload.image.id}-${payload.image.path}`;
  }

  private getAddedItemInFolderKey(payload: AddItemInFolderPayload) {
    return JSON.stringify(payload);
  }

  private getQuantityAdjustmentKey(payload: AdjustItemQuantityPayload) {
    return `${payload.itemId}-${payload.quantity}`;
  }

  async delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.lastDeletedItemId = id;
        resolve();
      }, this.delay);
    });
  }

  async adjustQuantity(payload: AdjustItemQuantityPayload): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          this.itemQuantityAdjustment.get(
            this.getQuantityAdjustmentKey(payload),
          )!,
        );
      }, this.delay);
    });
  }
}
