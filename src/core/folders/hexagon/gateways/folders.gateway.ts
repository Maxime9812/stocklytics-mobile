import { FolderModel } from '../models/folder.model';

export type AddFolderPayload = {
  id: string;
  name: string;
  parentId?: string;
};

export interface FoldersGateway {
  getInFolder(folderId: string | null): Promise<FolderModel[]>;
  addFolder(payload: AddFolderPayload): Promise<FolderModel>;
}
