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
};

export interface ItemsGateway {
  getFromFolder(folderId: string | undefined): Promise<Item[]>;
  getById(id: string): Promise<Item | undefined>;
  addItemInFolder(payload: AddItemInFolderPayload): Promise<Item>;
}
