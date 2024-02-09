import {
  AddItemInFolderPayload,
  EditNotePayload,
  Item,
  ItemsGateway,
} from '../../../hexagon/gateways/items.gateway';
import { AxiosInstance } from 'axios';

export class AxiosItemsGateway implements ItemsGateway {
  constructor(private readonly axios: AxiosInstance) {}

  async editNote(payload: EditNotePayload): Promise<void> {
    await this.axios.post(`/items/${payload.id}/edit/note`, {
      note: payload.note,
    });
  }

  async getById(id: string): Promise<Item | undefined> {
    return Promise.resolve(undefined);
  }

  async getFromFolder(folderId: string | undefined): Promise<Item[]> {
    const response = await this.axios.get<Item[]>('/items', {
      params: { folderId },
    });
    return response.data;
  }

  async addItemInFolder(payload: AddItemInFolderPayload): Promise<Item> {
    try {
      const response = await this.axios.post<Item>('/items', payload);
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
