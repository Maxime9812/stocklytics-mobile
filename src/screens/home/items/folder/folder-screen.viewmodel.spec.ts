import { createFolderScreenViewModel } from './folder-screen.viewmodel';
import { stateBuilder } from '../../../../core/state-builder';
import { itemBuilder } from '../../../../core/items/__tests__/item.builder';

describe('FolderScreenViewModel', () => {
  it('should be in loading state when folders items is loading', () => {
    const initialState = stateBuilder()
      .withLoadingFoldersItems(['folder-id'])
      .build();
    const { type } = createFolderScreenViewModel(initialState)({
      folderId: 'folder-id',
    });
    expect(type).toEqual('loading');
  });

  it('should be in loaded state when folders items is loaded', () => {
    const initialState = stateBuilder()
      .withNotLoadingFoldersItems(['folder-id'])
      .build();
    const { type } = createFolderScreenViewModel(initialState)({
      folderId: 'folder-id',
    });
    expect(type).toEqual('loaded');
  });

  it('should return folders items when folders items is loaded', () => {
    const initialState = stateBuilder()
      .withNotLoadingFoldersItems(['folder-id'])
      .withItems([
        itemBuilder()
          .withId('item-id-1')
          .withName('Iphone 13 pro max')
          .withFolderId('folder-id')
          .build(),
        itemBuilder()
          .withId('item-id-2')
          .withName('Iphone 14 pro max')
          .withFolderId('folder-id')
          .build(),
      ])
      .build();
    const viewModel = createFolderScreenViewModel(initialState)({
      folderId: 'folder-id',
    });
    expect(viewModel).toEqual(
      expect.objectContaining({
        items: [
          {
            id: 'item-id-1',
            name: 'Iphone 13 pro max',
            quantity: 1,
          },
          {
            id: 'item-id-2',
            name: 'Iphone 14 pro max',
            quantity: 1,
          },
        ],
      }),
    );
  });

  describe('Stats', () => {
    it('stats must be 0 when nothing', () => {
      const initialState = stateBuilder()
        .withNotLoadingFoldersItems(['folder-id'])
        .build();
      const viewModel = createFolderScreenViewModel(initialState)({
        folderId: 'folder-id',
      });
      expect(viewModel).toEqual(
        expect.objectContaining({
          stats: {
            totalItems: 0,
            totalQuantity: 0,
          },
        }),
      );
    });
    it('should return stats', () => {
      const initialState = stateBuilder()
        .withNotLoadingFoldersItems(['folder-id'])
        .withItems([
          itemBuilder()
            .withId('item-id-1')
            .withName('Iphone 13 pro max')
            .withFolderId('folder-id')
            .build(),
          itemBuilder()
            .withId('item-id-2')
            .withName('Iphone 14 pro max')
            .withFolderId('folder-id')
            .build(),
        ])
        .build();
      const viewModel = createFolderScreenViewModel(initialState)({
        folderId: 'folder-id',
      });
      expect(viewModel).toEqual(
        expect.objectContaining({
          stats: {
            totalItems: 2,
            totalQuantity: 2,
          },
        }),
      );
    });
  });
});
