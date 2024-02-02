import {
  AddFolderPayload,
  FoldersGateway,
} from '../../hexagon/gateways/folders.gateway';
import { FolderModel } from '../../hexagon/models/folder.model';

export class StubFoldersGateway implements FoldersGateway {
  private _foldersInFolder: Map<string, FolderModel[]> = new Map();
  private _folderAdded: Map<string, FolderModel> = new Map();

  constructor(private readonly delay = 0) {}

  async getInFolder(folderId: string | null): Promise<FolderModel[]> {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve(this._foldersInFolder.get(folderId ?? 'root') ?? []),
        this.delay,
      ),
    );
  }

  async addFolder(payload: AddFolderPayload): Promise<FolderModel> {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            this._folderAdded.get(this.getFolderAddedPayloadKey(payload))!,
          ),
        this.delay,
      ),
    );
  }

  givenFoldersInFolder(folders: FolderModel[], folderId?: string) {
    this._foldersInFolder.set(folderId ?? 'root', folders);
  }

  givenFolderAdded(payload: AddFolderPayload, folderAdded: FolderModel) {
    this._folderAdded.set(this.getFolderAddedPayloadKey(payload), folderAdded);
  }

  private getFolderAddedPayloadKey(payload: AddFolderPayload) {
    return `${payload.id}-${payload.name}-${payload.parentId}`;
  }
}
