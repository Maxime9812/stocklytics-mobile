import { FoldersGateway } from '../../hexagon/gateways/folders.gateway';
import { FolderModel } from '../../hexagon/models/folder.model';

export class StubFoldersGateway implements FoldersGateway {
  private _foldersInFolder: Map<string, FolderModel[]> = new Map();

  constructor(private readonly delay = 0) {}

  async getInFolder(folderId?: string): Promise<FolderModel[]> {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve(this._foldersInFolder.get(folderId ?? 'root') ?? []),
        this.delay,
      ),
    );
  }

  givenFoldersInFolder(folders: FolderModel[], folderId?: string) {
    this._foldersInFolder.set(folderId ?? 'root', folders);
  }
}
