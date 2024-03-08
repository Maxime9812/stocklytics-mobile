import { createFolderScreenViewModel } from './folder-screen.viewmodel';
import { stateBuilder } from '../../../../core/state-builder';
import { itemBuilder } from '../../../../core/items/__tests__/item.builder';
import { folderBuilder } from '../../../../core/folders/__tests__/folder.builder';
import { tagBuilder } from '../../../../core/tags/__tests__/tag.builder';

describe('FolderScreenViewModel', () => {
  it('should be in empty state when target folder is empty', () => {
    const initialState = stateBuilder().build();

    const { type } = createFolderScreenViewModel({ folderId: 'folder-id' })(
      initialState,
    );

    expect(type).toEqual('empty');
  });

  it('should be in loading state when folders items is loading', () => {
    const initialState = stateBuilder()
      .withLoadingFoldersItems(['folder-id'])
      .build();
    const { type } = createFolderScreenViewModel({ folderId: 'folder-id' })(
      initialState,
    );
    expect(type).toEqual('loading');
  });

  it('should be in loading state when folders folders is loading', () => {
    const initialState = stateBuilder()
      .withFolderInFolderLoading('folder-id')
      .build();
    const { type } = createFolderScreenViewModel({ folderId: 'folder-id' })(
      initialState,
    );
    expect(type).toEqual('loading');
  });

  it('should be in loaded state when folders items is loading but was already loaded', () => {
    const initialState = stateBuilder()
      .withLoadingFoldersItems(['folder-id'])
      .withItems([itemBuilder().withFolderId('folder-id').build()])
      .build();

    const { type } = createFolderScreenViewModel({ folderId: 'folder-id' })(
      initialState,
    );

    expect(type).toEqual('loaded');
  });

  it('should be in loaded state when folders folders is loading but was already loaded', () => {
    const initialState = stateBuilder()
      .withLoadingFoldersItems(['folder-id'])
      .withFolders([folderBuilder().withParentId('folder-id').build()])
      .build();

    const { type } = createFolderScreenViewModel({ folderId: 'folder-id' })(
      initialState,
    );

    expect(type).toEqual('loaded');
  });

  it('should be in loaded state when folders items/folders is loaded', () => {
    const initialState = stateBuilder()
      .withNotLoadingFoldersItems(['folder-id'])
      .withItems([itemBuilder().withFolderId('folder-id').build()])
      .build();
    const { type } = createFolderScreenViewModel({ folderId: 'folder-id' })(
      initialState,
    );
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
          .withImage('image-url')
          .build(),
      ])
      .build();
    const viewModel = createFolderScreenViewModel({ folderId: 'folder-id' })(
      initialState,
    );
    expect(viewModel).toEqual(
      expect.objectContaining({
        items: [
          {
            id: 'item-id-1',
            name: 'Iphone 13 pro max',
            tags: [],
            quantity: 1,
          },
          {
            id: 'item-id-2',
            name: 'Iphone 14 pro max',
            tags: [],
            imageUrl: 'image-url',
            quantity: 1,
          },
        ],
      }),
    );
  });

  it('should return items tags', () => {
    const initialState = stateBuilder()
      .withNotLoadingFoldersItems(['folder-id'])
      .withItems([
        itemBuilder()
          .withId('item-id-1')
          .withName('Iphone 13 pro max')
          .withTags(['tag-id-1', 'tag-id-2'])
          .withFolderId('folder-id')
          .build(),
      ])
      .withTags([
        tagBuilder().withId('tag-id-1').withName('Tag 1').build(),
        tagBuilder().withId('tag-id-2').withName('Tag 2').build(),
      ])
      .build();
    const viewModel = createFolderScreenViewModel({ folderId: 'folder-id' })(
      initialState,
    );
    expect(viewModel).toEqual(
      expect.objectContaining({
        items: [
          {
            id: 'item-id-1',
            name: 'Iphone 13 pro max',
            tags: [
              {
                id: 'tag-id-1',
                name: 'Tag 1',
              },
              {
                id: 'tag-id-2',
                name: 'Tag 2',
              },
            ],
            quantity: 1,
          },
        ],
      }),
    );
  });

  it('should return folders folders when is loaded', () => {
    const initialState = stateBuilder()
      .withFolders([
        folderBuilder()
          .withId('folder-id-2')
          .withName('Electronics')
          .withParentId('folder-id')
          .withItemQuantity(2)
          .build(),
        folderBuilder()
          .withId('folder-id-3')
          .withName('Others')
          .withItemQuantity(1)
          .withParentId('folder-id')
          .build(),
      ])
      .build();
    const viewModel = createFolderScreenViewModel({ folderId: 'folder-id' })(
      initialState,
    );
    expect(viewModel).toEqual(
      expect.objectContaining({
        folders: [
          {
            id: 'folder-id-2',
            name: 'Electronics',
            quantity: 2,
          },
          {
            id: 'folder-id-3',
            name: 'Others',
            quantity: 1,
          },
        ],
      }),
    );
  });

  describe('Stats', () => {
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
        .withFolders([
          folderBuilder()
            .withId('folder-id-2')
            .withItemQuantity(1)
            .withParentId('folder-id')
            .build(),
        ])
        .build();
      const viewModel = createFolderScreenViewModel({ folderId: 'folder-id' })(
        initialState,
      );
      expect(viewModel).toEqual(
        expect.objectContaining({
          stats: {
            totalFolders: 1,
            totalItems: 2,
            totalQuantity: 3,
          },
        }),
      );
    });
  });
});
