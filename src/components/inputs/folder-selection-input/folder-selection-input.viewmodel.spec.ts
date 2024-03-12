import { createFolderSelectionInputViewModel } from './folder-selection-input.viewmodel';
import { stateBuilder } from '../../../core/state-builder';
import { folderBuilder } from '../../../core/folders/__tests__/folder.builder';
import { createTestStore } from '../../../core/create-store';
import { getFoldersInFolderUseCase } from '../../../core/folders/hexagon/usecases/get-folders-in-folder/get-folders-in-folder.usecase';

describe('FolderSelectionInputViewModel', () => {
  describe('toggleFolder', () => {
    describe('When folder is close', () => {
      it('should call getFoldersInFolderUseCase', async () => {
        const store = createTestStore();
        const { toggleFolder } = createFolderSelectionInputViewModel({
          dispatch: store.dispatch,
          openFolderIds: [],
          setOpenFolderIds: jest.fn(),
          onChange: jest.fn(),
        })(store.getState());

        await toggleFolder('folder-id');

        expect(
          store.getDispatchedUseCaseArgs(getFoldersInFolderUseCase),
        ).toEqual('folder-id');
      });

      it('should open folder', async () => {
        const initialState = stateBuilder()
          .withFolders([folderBuilder().withId('folder-id').build()])
          .build();

        let openFolderIds: string[] = [];
        const setOpenFolderIds = (ids: string[]) => {
          openFolderIds = ids;
        };

        const store = createTestStore({}, initialState);
        const { toggleFolder } = createFolderSelectionInputViewModel({
          dispatch: store.dispatch,
          openFolderIds,
          setOpenFolderIds,
          onChange: jest.fn(),
        })(store.getState());

        await toggleFolder('folder-id');

        expect(openFolderIds).toEqual(['folder-id']);
      });

      it('should open folder and already opened folders', async () => {
        const initialState = stateBuilder()
          .withFolders([folderBuilder().withId('folder-id').build()])
          .build();

        let openFolderIds: string[] = ['folder-id'];
        const setOpenFolderIds = (ids: string[]) => {
          openFolderIds = ids;
        };

        const store = createTestStore({}, initialState);
        const { toggleFolder } = createFolderSelectionInputViewModel({
          dispatch: store.dispatch,
          openFolderIds,
          setOpenFolderIds,
          onChange: jest.fn(),
        })(store.getState());

        await toggleFolder('folder-id-2');

        expect(openFolderIds).toEqual(['folder-id', 'folder-id-2']);
      });
    });
    describe('When folder is open', () => {
      it('should close folder', async () => {
        let openFolderIds: string[] = ['folder-id'];
        const setOpenFolderIds = (ids: string[]) => {
          openFolderIds = ids;
        };

        const { toggleFolder } = createFolderSelectionInputViewModel({
          dispatch: jest.fn(),
          openFolderIds,
          setOpenFolderIds,
          onChange: jest.fn(),
        })(stateBuilder().build());

        await toggleFolder('folder-id');

        expect(openFolderIds).toEqual([]);
      });
    });
  });

  describe('Folders', () => {
    it('should return root folders', async () => {
      const state = stateBuilder()
        .withFolders([
          folderBuilder().withId('folder-id').withName('Folder 1').build(),
          folderBuilder().withId('folder-id-2').withName('Folder 2').build(),
        ])
        .build();

      const { folders } = createFolderSelectionInputViewModel({
        dispatch: jest.fn(),
        openFolderIds: [],
        setOpenFolderIds: jest.fn(),
        onChange: jest.fn(),
      })(state);

      expect(folders).toEqual([
        expect.objectContaining({ id: 'folder-id', name: 'Folder 1' }),
        expect.objectContaining({ id: 'folder-id-2', name: 'Folder 2' }),
      ]);
    });

    it('should return folders in folders', async () => {
      const state = stateBuilder()
        .withFolders([
          folderBuilder().withId('folder-id').withName('Folder 1').build(),
          folderBuilder()
            .withId('folder-id-2')
            .withName('Folder 2')
            .withParentId('folder-id')
            .build(),
          folderBuilder()
            .withId('folder-id-3')
            .withName('Folder 3')
            .withParentId('folder-id-2')
            .build(),
        ])
        .build();

      const { folders } = createFolderSelectionInputViewModel({
        dispatch: jest.fn(),
        openFolderIds: [],
        setOpenFolderIds: jest.fn(),
        onChange: jest.fn(),
      })(state);

      expect(folders).toEqual([
        expect.objectContaining({
          id: 'folder-id',
          name: 'Folder 1',
          folders: [
            expect.objectContaining({
              id: 'folder-id-2',
              name: 'Folder 2',
              folders: [
                expect.objectContaining({
                  id: 'folder-id-3',
                  name: 'Folder 3',
                  folders: [],
                }),
              ],
            }),
          ],
        }),
      ]);
    });

    it('should return isOpen true for open folders', async () => {
      const state = stateBuilder()
        .withFolders([
          folderBuilder().withId('folder-id').withName('Folder 1').build(),
          folderBuilder()
            .withId('folder-id-2')
            .withName('Folder 2')
            .withParentId('folder-id')
            .build(),
        ])
        .build();

      const { folders } = createFolderSelectionInputViewModel({
        dispatch: jest.fn(),
        openFolderIds: ['folder-id'],
        setOpenFolderIds: jest.fn(),
        onChange: jest.fn(),
      })(state);

      expect(folders).toEqual([
        expect.objectContaining({
          isOpen: true,
          folders: [
            expect.objectContaining({
              isOpen: false,
            }),
          ],
        }),
      ]);
    });

    describe('Is selected', () => {
      it('should be false when folder is NOT selected', async () => {
        const state = stateBuilder()
          .withFolders([
            folderBuilder().withId('folder-id').withName('Folder 1').build(),
          ])
          .build();

        const { folders } = createFolderSelectionInputViewModel({
          dispatch: jest.fn(),
          openFolderIds: [],
          setOpenFolderIds: jest.fn(),
          onChange: jest.fn(),
        })(state);

        expect(folders).toEqual([
          expect.objectContaining({ isSelected: false }),
        ]);
      });

      it('should be true when folder is selected', async () => {
        const state = stateBuilder()
          .withFolders([
            folderBuilder().withId('folder-id').withName('Folder 1').build(),
          ])
          .build();

        const { folders } = createFolderSelectionInputViewModel({
          dispatch: jest.fn(),
          openFolderIds: [],
          setOpenFolderIds: jest.fn(),
          selectedFolderId: 'folder-id',
          onChange: jest.fn(),
        })(state);

        expect(folders).toEqual([
          expect.objectContaining({ isSelected: true }),
        ]);
      });
    });
  });

  describe('Toggle select folder', () => {
    describe('When folder is NOT selected', () => {
      it('should select folder', async () => {
        let value: string | undefined;
        const onChange = (folderId?: string) => {
          value = folderId;
        };

        const { toggleSelectFolder } = createFolderSelectionInputViewModel({
          dispatch: jest.fn(),
          openFolderIds: [],
          setOpenFolderIds: jest.fn(),
          selectedFolderId: value,
          onChange,
        })(stateBuilder().build());

        toggleSelectFolder('folder-id');

        expect(value).toEqual('folder-id');
      });
    });
    describe('When folder is selected', () => {
      describe('When folder is already selected', () => {
        it('should unselect folder', async () => {
          let value: string | undefined = 'folder-id';
          const onChange = (folderId?: string) => {
            value = folderId;
          };

          const { toggleSelectFolder } = createFolderSelectionInputViewModel({
            dispatch: jest.fn(),
            openFolderIds: [],
            setOpenFolderIds: jest.fn(),
            selectedFolderId: value,
            onChange,
          })(stateBuilder().build());

          toggleSelectFolder('folder-id');

          expect(value).toEqual(undefined);
        });
      });
      describe('When folder selected is not same', () => {
        it('should select new folder', async () => {
          let value: string | undefined = 'folder-id-2';
          const onChange = (folderId?: string) => {
            value = folderId;
          };

          const { toggleSelectFolder } = createFolderSelectionInputViewModel({
            dispatch: jest.fn(),
            openFolderIds: [],
            setOpenFolderIds: jest.fn(),
            selectedFolderId: value,
            onChange,
          })(stateBuilder().build());

          toggleSelectFolder('folder-id');

          expect(value).toEqual('folder-id');
        });
      });
    });
    describe('When folder is root', () => {
      it('should select root folder', async () => {
        let value: string | undefined = 'folder-id';
        const onChange = (folderId?: string) => {
          value = folderId;
        };

        const { toggleSelectFolder } = createFolderSelectionInputViewModel({
          dispatch: jest.fn(),
          openFolderIds: [],
          setOpenFolderIds: jest.fn(),
          selectedFolderId: value,
          onChange,
        })(stateBuilder().build());

        toggleSelectFolder();

        expect(value).toEqual('root');
      });
    });
  });

  describe('Root is selected', () => {
    it('should be true when root is selected', () => {
      const { isRootSelected } = createFolderSelectionInputViewModel({
        dispatch: jest.fn(),
        openFolderIds: [],
        setOpenFolderIds: jest.fn(),
        selectedFolderId: 'root',
        onChange: jest.fn(),
      })(stateBuilder().build());

      expect(isRootSelected).toEqual(true);
    });

    it('should be false when root is NOT selected', () => {
      const { isRootSelected } = createFolderSelectionInputViewModel({
        dispatch: jest.fn(),
        openFolderIds: [],
        setOpenFolderIds: jest.fn(),
        selectedFolderId: 'folder-id',
        onChange: jest.fn(),
      })(stateBuilder().build());

      expect(isRootSelected).toEqual(false);
    });
  });
});
