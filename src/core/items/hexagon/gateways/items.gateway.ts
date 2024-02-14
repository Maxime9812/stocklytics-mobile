import { Barcode } from '../../../scanner/hexagon/models/barcode';

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

export interface ItemsGateway {
  getFromFolder(folderId: string | undefined): Promise<Item[]>;
  getById(id: string): Promise<Item | undefined>;
  addItemInFolder(payload: AddItemInFolderPayload): Promise<Item>;
  editNote(payload: EditNotePayload): Promise<void>;
  linkBarcode(payload: LinkBarcodeToItemPayload): Promise<void>;
  unlinkBarcode(itemId: string): Promise<void>;
  delete(id: string): Promise<void>;
}
