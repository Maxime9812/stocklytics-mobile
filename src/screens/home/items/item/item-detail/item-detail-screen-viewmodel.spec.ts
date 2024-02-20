import {
  createItemDetailScreenViewModel,
  ItemDetailScreenViewModelLoaded,
} from './item-detail-screen-viewmodel';
import { stateBuilder } from '../../../../../core/state-builder';
import { itemBuilder } from '../../../../../core/items/__tests__/item.builder';
import { createTestStore } from '../../../../../core/create-store';
import { unlinkItemBarcodeUseCase } from '../../../../../core/items/hexagon/usecases/unlink-item-barcode/unlink-item-barcode.usecase';
import { folderBuilder } from '../../../../../core/folders/__tests__/folder.builder';
import { deleteItemImageUseCase } from '../../../../../core/items/hexagon/usecases/delete-item-image/delete-item-image.usecase';

describe('ItemDetailScreenViewModel', () => {
  it('Should be in error state when item is not found', () => {
    const viewModel = createItemDetailScreenViewModel({
      itemId: 'item-id',
      dispatch: jest.fn(),
    })(stateBuilder().build());

    expect(viewModel).toEqual(
      expect.objectContaining({
        type: 'loading',
      }),
    );
  });

  it('Should be in loaded state when item is found', () => {
    const state = stateBuilder()
      .withItems([itemBuilder().withId('item-id').build()])
      .build();

    const viewModel = createItemDetailScreenViewModel({
      itemId: 'item-id',
      dispatch: jest.fn(),
    })(state);

    expect(viewModel).toEqual(
      expect.objectContaining({
        type: 'loaded',
      }),
    );
  });

  it('Should return item infos', () => {
    const state = stateBuilder()
      .withItems([
        itemBuilder()
          .withId('item-id')
          .withName('item-name')
          .withQuantity(10)
          .withNote('This is a note')
          .withBarcode({
            type: 'qrcode',
            value: 'barcode-value',
          })
          .withImage('https://image.com')
          .build(),
      ])
      .build();

    const viewModel = createItemDetailScreenViewModel({
      itemId: 'item-id',
      dispatch: jest.fn(),
    })(state);

    expect(viewModel).toEqual(
      expect.objectContaining({
        item: expect.objectContaining({
          id: 'item-id',
          name: 'item-name',
          quantity: 10,
          note: 'This is a note',
          barcode: {
            type: 'qrcode',
            value: 'barcode-value',
          },
          image: 'https://image.com',
        }),
      }),
    );
  });

  it('Should call unlinkItemBarcodeUseCase when unlinkBarcode is called', async () => {
    const state = stateBuilder()
      .withItems([itemBuilder().withId('item-id').build()])
      .build();
    const store = createTestStore({}, state);

    const viewModel = createItemDetailScreenViewModel({
      itemId: 'item-id',
      dispatch: store.dispatch,
    })(store.getState());

    await (viewModel as ItemDetailScreenViewModelLoaded).item.unlinkBarcode();

    expect(store.getDispatchedUseCaseArgs(unlinkItemBarcodeUseCase)).toEqual(
      'item-id',
    );
  });

  it('Should call deleteItemImageUseCase when deleteImage is called', async () => {
    const state = stateBuilder()
      .withItems([itemBuilder().withId('item-id').build()])
      .build();
    const store = createTestStore({}, state);

    const viewModel = createItemDetailScreenViewModel({
      itemId: 'item-id',
      dispatch: store.dispatch,
    })(store.getState());

    await (viewModel as ItemDetailScreenViewModelLoaded).item.deleteImage();

    expect(store.getDispatchedUseCaseArgs(deleteItemImageUseCase)).toEqual(
      'item-id',
    );
  });

  describe('Item has note', () => {
    it('Should return false when note is empty', () => {
      const state = stateBuilder()
        .withItems([itemBuilder().withId('item-id').withNote('').build()])
        .build();

      const viewModel = createItemDetailScreenViewModel({
        itemId: 'item-id',
        dispatch: jest.fn(),
      })(state);

      expect(viewModel).toEqual(
        expect.objectContaining({
          item: expect.objectContaining({
            hasNote: false,
          }),
        }),
      );
    });
    it('Should return true when note is NOT empty', () => {
      const state = stateBuilder()
        .withItems([
          itemBuilder().withId('item-id').withNote('This is a note').build(),
        ])
        .build();

      const viewModel = createItemDetailScreenViewModel({
        itemId: 'item-id',
        dispatch: jest.fn(),
      })(state);

      expect(viewModel).toEqual(
        expect.objectContaining({
          item: expect.objectContaining({
            hasNote: true,
          }),
        }),
      );
    });
  });

  describe('Item has tags', () => {
    it('Should return empty array when item has no tags', () => {
      const state = stateBuilder()
        .withItems([itemBuilder().withId('item-id').build()])
        .build();

      const viewModel = createItemDetailScreenViewModel({
        itemId: 'item-id',
        dispatch: jest.fn(),
      })(state);

      expect(viewModel).toEqual(
        expect.objectContaining({
          item: expect.objectContaining({
            tags: [],
          }),
        }),
      );
    });
    it('Should return tags when item has tags', () => {
      const state = stateBuilder()
        .withItems([
          itemBuilder().withId('item-id').withTags(['tag-id']).build(),
        ])
        .withTags([{ id: 'tag-id', name: 'tag-name' }])
        .build();

      const viewModel = createItemDetailScreenViewModel({
        itemId: 'item-id',
        dispatch: jest.fn(),
      })(state);

      expect(viewModel).toEqual(
        expect.objectContaining({
          item: expect.objectContaining({
            tags: [
              {
                id: 'tag-id',
                name: 'tag-name',
              },
            ],
          }),
        }),
      );
    });
  });

  describe('Item created at', () => {
    it('Should return date', () => {
      const state = stateBuilder()
        .withItems([
          itemBuilder()
            .withId('item-id')
            .createdAt(new Date('2024-01-01T00:00:00.000Z'))
            .build(),
        ])
        .build();

      const viewModel = createItemDetailScreenViewModel({
        itemId: 'item-id',
        locale: 'fr-FR',
        dispatch: jest.fn(),
      })(state);

      expect(viewModel).toEqual(
        expect.objectContaining({
          item: expect.objectContaining({
            createdAt: '01/01/2024 01:00',
          }),
        }),
      );
    });
  });

  describe.skip('Item has parent folder', () => {
    it('Should return parent folder', () => {
      const state = stateBuilder()
        .withItems([
          itemBuilder().withId('item-id').withFolderId('folder-id').build(),
        ])
        .withFolders([
          folderBuilder().withId('folder-id').withName('Electronics').build(),
        ])
        .build();

      const viewModel = createItemDetailScreenViewModel({
        itemId: 'item-id',
        dispatch: jest.fn(),
      })(state);

      expect(viewModel).toEqual(
        expect.objectContaining({
          item: expect.objectContaining({
            parentFolder: {
              id: 'folder-id',
              name: 'Electronics',
            },
          }),
        }),
      );
    });
  });
});
