import {
  AddFolderPayload,
  FoldersGateway,
  MoveFolderPayload,
} from '../../hexagon/gateways/folders.gateway';
import { FolderModel } from '../../hexagon/models/folder.model';

export class StubFoldersGateway implements FoldersGateway {
  private _foldersInFolder: Map<string, FolderModel[]> = new Map();
  private _folderAdded: Map<string, FolderModel> = new Map();
  lastDeletedFolder?: string;
  lastMovedFolder?: MoveFolderPayload;

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

  async delete(folderId: string): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.lastDeletedFolder = folderId;
        resolve();
      }, this.delay),
    );
  }

  async move(payload: MoveFolderPayload): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.lastMovedFolder = payload;
        resolve();
      }, this.delay),
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
