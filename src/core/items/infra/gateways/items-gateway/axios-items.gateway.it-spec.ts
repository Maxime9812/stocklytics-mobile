import axios from 'axios';
import { AxiosItemsGateway } from './axios-items.gateway';
import nock from 'nock';
import { ItemModel } from '../../../hexagon/models/item.model';

const BASE_URL = 'http://localhost';

describe('AxiosItemsGateway', () => {
  let axiosItemsGateway: AxiosItemsGateway;

  beforeEach(() => {
    axiosItemsGateway = new AxiosItemsGateway(
      axios.create({ baseURL: BASE_URL }),
    );
  });

  describe('getFromFolder', () => {
    test('Should return items', async () => {
      nock(BASE_URL)
        .get('/items?folderId=folder-id')
        .reply(200, [
          {
            id: 'item-id',
            name: 'Item name',
            quantity: 10,
            tags: [],
            folderId: 'folder-id',
          },
        ]);
      expect(await axiosItemsGateway.getFromFolder('folder-id')).toEqual([
        {
          id: 'item-id',
          name: 'Item name',
          quantity: 10,
          tags: [],
          folderId: 'folder-id',
        },
      ]);
    });
  });

  describe('addItemInFolder', () => {
    test('Item is send and response is returned', async () => {
      nock(BASE_URL)
        .post('/items', {
          id: 'item-id',
          name: 'Item name',
          quantity: 10,
          folderId: 'folder-id',
        })
        .reply(200, {
          id: 'item-id',
          name: 'Item name',
          quantity: 10,
          tags: [],
          folderId: 'folder-id',
        });
      expect(
        await axiosItemsGateway.addItemInFolder({
          id: 'item-id',
          name: 'Item name',
          quantity: 10,
          folderId: 'folder-id',
        }),
      ).toEqual({
        id: 'item-id',
        name: 'Item name',
        quantity: 10,
        tags: [],
        folderId: 'folder-id',
      });
    });
  });

  describe('editNote', () => {
    test('Should edit', async () => {
      const scope = nock(BASE_URL)
        .post('/items/item-id/note', { note: 'This is a note' })
        .reply(200);
      await axiosItemsGateway.editNote({
        id: 'item-id',
        note: 'This is a note',
      });
      expect(scope.isDone()).toBe(true);
    });
  });

  describe('linkBarcode', () => {
    it('Should send request', async () => {
      const scope = nock(BASE_URL)
        .post('/items/item-id/barcode', {
          barcode: {
            type: 'ean13',
            value: '1234567890',
          },
        })
        .reply(200);
      await axiosItemsGateway.linkBarcode({
        itemId: 'item-id',
        barcode: {
          type: 'ean13',
          value: '1234567890',
        },
      });
      expect(scope.isDone()).toBe(true);
    });
  });

  describe('delete', () => {
    it('Should send request', async () => {
      const scope = nock(BASE_URL).delete('/items/item-id').reply(200);
      await axiosItemsGateway.delete('item-id');
      expect(scope.isDone()).toBe(true);
    });
  });

  describe('unlinkBarcode', () => {
    it('Should send request', async () => {
      const scope = nock(BASE_URL).delete('/items/item-id/barcode').reply(200);
      await axiosItemsGateway.unlinkBarcode('item-id');
      expect(scope.isDone()).toBe(true);
    });
  });

  describe('getById', () => {
    it('Should return item', async () => {
      nock(BASE_URL).get('/items/item-id').reply(200, {
        id: 'item-id',
        name: 'Item name',
        quantity: 10,
        tags: [],
        folderId: 'folder-id',
        note: '',
        createdAt: '2024-01-01T00:00:00.000Z',
      });
      expect(await axiosItemsGateway.getById('item-id')).toEqual<ItemModel>({
        id: 'item-id',
        name: 'Item name',
        quantity: 10,
        tags: [],
        folderId: 'folder-id',
        note: '',
        createdAt: '2024-01-01T00:00:00.000Z',
      });
    });
  });

  describe('editName', () => {
    it('Should send request', async () => {
      const scope = nock(BASE_URL)
        .post('/items/item-id/name', { name: 'New name' })
        .reply(200);
      await axiosItemsGateway.editName({
        itemId: 'item-id',
        name: 'New name',
      });
      expect(scope.isDone()).toBe(true);
    });
  });
});
