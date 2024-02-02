import {
  AddFolderPayload,
  FoldersGateway,
} from '../../hexagon/gateways/folders.gateway';
import { FolderModel } from '../../hexagon/models/folder.model';
import { AxiosInstance } from 'axios';

export class AxiosFoldersGateway implements FoldersGateway {
  constructor(private readonly axios: AxiosInstance) {}

  async getInFolder(folderId: string | null): Promise<FolderModel[]> {
    const response = await this.axios.get('/folders', {
      params: { folderId },
    });
    return response.data;
  }

  async addFolder(payload: AddFolderPayload): Promise<FolderModel> {
    const response = await this.axios.post('/folders', payload);
    return response.data;
  }
}
