import { FolderModel } from '../models/folder.model';

export interface FoldersGateway {
  getInFolder(folderId?: string): Promise<FolderModel[]>;
}
