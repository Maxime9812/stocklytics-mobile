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
  image?: string;
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
}
