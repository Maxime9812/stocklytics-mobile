import { ItemsGateway } from '../../hexagon/gateways/items.gateway';
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
}
