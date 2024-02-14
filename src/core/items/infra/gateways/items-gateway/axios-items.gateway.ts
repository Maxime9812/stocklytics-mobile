import {
  AddItemInFolderPayload,
  EditNotePayload,
  Item,
  ItemsGateway,
  LinkBarcodeToItemPayload,
} from '../../../hexagon/gateways/items.gateway';
import { AxiosInstance } from 'axios';

export class AxiosItemsGateway implements ItemsGateway {
  constructor(private readonly axios: AxiosInstance) {}

  async editNote(payload: EditNotePayload): Promise<void> {
    await this.axios.post(`/items/${payload.id}/note`, {
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
      console.error(e);
      throw e;
    }
  }

  async linkBarcode({
    itemId,
    barcode,
  }: LinkBarcodeToItemPayload): Promise<void> {
    await this.axios.post(`/items/${itemId}/barcode`, { barcode });
  }

  async unlinkBarcode(itemId: string): Promise<void> {
    await this.axios.delete(`/items/${itemId}/barcode`);
  }

  async delete(id: string): Promise<void> {
    await this.axios.delete(`/items/${id}`);
  }
}
