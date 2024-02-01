import {
  AddItemInFolderPayload,
  ItemsGateway,
} from '../../hexagon/gateways/items.gateway';
import { ItemModel } from '../../hexagon/models/item.model';
import { AxiosInstance } from 'axios';

export class AxiosItemsGateway implements ItemsGateway {
  constructor(private readonly axios: AxiosInstance) {}

  async getById(id: string): Promise<ItemModel | undefined> {
    return Promise.resolve(undefined);
  }

  async getFromFolder(folderId: string | undefined): Promise<ItemModel[]> {
    const response = await this.axios.get<ItemModel[]>('/items', {
      params: { folderId },
    });
    return response.data;
  }

  async addItemInFolder(payload: AddItemInFolderPayload): Promise<ItemModel> {
    try {
      const response = await this.axios.post<ItemModel>('/items', payload);
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
