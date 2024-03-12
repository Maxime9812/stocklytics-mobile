import { Barcode } from '../../../scanner/hexagon/models/barcode';
import { Either } from 'fp-ts/Either';

export type AddItemInFolderPayload = {
  id: string;
  name: string;
  quantity: number;
  folderId?: string;
};

export type Item = {
  id: string;
  name: string;
  quantity: number;
  note: string;
  folderId: string | null;
  createdAt: string;
  tags: {
    id: string;
    name: string;
  }[];
  imageUrl?: string;
  barcode?: Barcode;
};

export type EditNotePayload = {
  id: string;
  note: string;
};

export type LinkBarcodeToItemPayload = {
  itemId: string;
  barcode: Barcode;
};

export type EditNamePayload = {
  itemId: string;
  name: string;
};

export type LinkBarcodeError = {
  type: 'BarcodeAlreadyLinkedToAnotherItemError';
  itemId: string;
};

export type AddItemImagePayload = {
  itemId: string;
  image: { id: string; path: string };
};

export type AdjustItemQuantityPayload = {
  itemId: string;
  quantity: number;
};

export type MoveItemPayload = {
  itemId: string;
  folderId: string;
};

export interface ItemsGateway {
  getFromFolder(folderId: string | undefined): Promise<Item[]>;
  getById(id: string): Promise<Item | undefined>;
  addItemInFolder(payload: AddItemInFolderPayload): Promise<Item>;
  editNote(payload: EditNotePayload): Promise<void>;
  linkBarcode(
    payload: LinkBarcodeToItemPayload,
  ): Promise<Either<LinkBarcodeError, void>>;
  unlinkBarcode(itemId: string): Promise<void>;
  delete(id: string): Promise<void>;
  editName(payload: EditNamePayload): Promise<void>;
  deleteImage(itemId: string): Promise<void>;
  addImage(payload: AddItemImagePayload): Promise<string>;
  adjustQuantity(payload: AdjustItemQuantityPayload): Promise<number>;
  setTags(itemId: string, tagIds: string[]): Promise<void>;
  moveToFolder(payload: MoveItemPayload): Promise<void>;
}
