import {
  AddItemInFolderPayload,
  EditNamePayload,
  EditNotePayload,
  Item,
  ItemsGateway,
  LinkBarcodeError,
  LinkBarcodeToItemPayload,
} from '../../../hexagon/gateways/items.gateway';
import { AxiosError, AxiosInstance } from 'axios';
import { Either, left, right } from 'fp-ts/Either';

export class AxiosItemsGateway implements ItemsGateway {
  constructor(private readonly axios: AxiosInstance) {}

  async editNote(payload: EditNotePayload): Promise<void> {
    await this.axios.post(`/items/${payload.id}/note`, {
      note: payload.note,
    });
  }

  async getById(id: string): Promise<Item | undefined> {
    const response = await this.axios.get<Item>(`/items/${id}`);
    return response.data;
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
  }: LinkBarcodeToItemPayload): Promise<Either<LinkBarcodeError, void>> {
    try {
      await this.axios.post(`/items/${itemId}/barcode`, { barcode });
      return right(undefined);
    } catch (e) {
      const error = e as AxiosError;
      if (error.response?.status === 409) {
        return left({ type: 'BarcodeAlreadyLinkedToAnotherItemError', itemId });
      }
      throw e;
    }
  }

  async unlinkBarcode(itemId: string): Promise<void> {
    await this.axios.delete(`/items/${itemId}/barcode`);
  }

  async delete(id: string): Promise<void> {
    await this.axios.delete(`/items/${id}`);
  }

  async editName(payload: EditNamePayload) {
    await this.axios.post(`/items/${payload.itemId}/name`, {
      name: payload.name,
    });
  }

  async deleteImage(itemId: string): Promise<void> {
    await this.axios.delete(`/items/${itemId}/image`);
  }
}
