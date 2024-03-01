import axios from 'axios';
import { AxiosItemsGateway } from './axios-items.gateway';
import nock from 'nock';
import { ItemModel } from '../../../hexagon/models/item.model';
import { isRight, Left } from 'fp-ts/Either';

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
      const result = await axiosItemsGateway.linkBarcode({
        itemId: 'item-id',
        barcode: {
          type: 'ean13',
          value: '1234567890',
        },
      });
      expect(scope.isDone()).toBe(true);
      expect(isRight(result)).toEqual(true);
    });
    it('Should return already linked error', async () => {
      nock(BASE_URL)
        .post('/items/item-id/barcode', {
          barcode: {
            type: 'ean13',
            value: '1234567890',
          },
        })
        .reply(409, {
          type: 'BarcodeAlreadyLinkedToAnotherItemError',
          itemId: 'item-id',
        });

      const result = await axiosItemsGateway.linkBarcode({
        itemId: 'item-id',
        barcode: {
          type: 'ean13',
          value: '1234567890',
        },
      });
      expect((result as Left<any>).left).toEqual({
        type: 'BarcodeAlreadyLinkedToAnotherItemError',
        itemId: 'item-id',
      });
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

  describe('deleteImage', () => {
    it('Should send request', async () => {
      const scope = nock(BASE_URL).delete('/items/item-id/image').reply(200);
      await axiosItemsGateway.deleteImage('item-id');
      expect(scope.isDone()).toBe(true);
    });
  });

  describe('addImage', () => {
    it('Should send request', async () => {
      nock(BASE_URL)
        .post('/items/item-id/images', (body) => {
          return true;
        })
        .reply(200, {
          imageUrl: 'image-url',
        });

      expect(
        await axiosItemsGateway.addImage({
          itemId: 'item-id',
          image: {
            id: 'image-id',
            path: 'file:///var/mobile/Containers/Data/Application/C3852992-8A96-4F6C-9607-4FC9758D447F/Library/Caches/ImagePicker/7FAC7758-BBA2-485D-9661-5D4F043E82AD.jpg"',
          },
        }),
      ).toEqual('image-url');
    });
  });

  describe('AdjustQuantity', () => {
    it('Should return new item quantity', async () => {
      nock(BASE_URL)
        .post('/items/item-id/quantity/adjust', { quantity: 5 })
        .reply(200, {
          quantity: 10,
        });

      expect(
        await axiosItemsGateway.adjustQuantity({
          itemId: 'item-id',
          quantity: 5,
        }),
      ).toEqual(10);
    });
  });
});
