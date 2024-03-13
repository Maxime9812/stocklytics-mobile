import { createSelector } from '@reduxjs/toolkit';
import { createSelectFoldersInFolder } from '../../../core/folders/folders.slice';
import { AppDispatch } from '../../../core/create-store';
import { getFoldersInFolderUseCase } from '../../../core/folders/hexagon/usecases/get-folders-in-folder/get-folders-in-folder.usecase';

type FolderSelectionInputViewModelParams = {
  dispatch: AppDispatch;
  openFolderIds: string[];
  setOpenFolderIds: (ids: string[]) => void;
  selectedFolderId?: string;
  onChange: (folderId?: string) => void;
  hideFolderId?: string;
};
type Folder = {
  id: string;
  name: string;
  folders: Folder[];
  isOpen: boolean;
  isSelected: boolean;
};

export type FolderSelectionInputViewModel = ReturnType<
  ReturnType<typeof createFolderSelectionInputViewModel>
>;
export const createFolderSelectionInputViewModel = ({
  dispatch,
  openFolderIds,
  setOpenFolderIds,
  selectedFolderId,
  onChange,
  hideFolderId,
}: FolderSelectionInputViewModelParams) =>
  createSelector([createSelectFoldersInFolder], (selectFolderInFolder) => {
    const getChildFolders = (folderId: string | null): Folder[] =>
      selectFolderInFolder(folderId)
        .filter((folder) => folder.id != hideFolderId)
        .map((folder) => ({
          id: folder.id,
          name: folder.name,
          isOpen: openFolderIds.includes(folder.id),
          folders: getChildFolders(folder.id),
          isSelected: folder.id === selectedFolderId,
        }));

    const folders = getChildFolders(null);

    const toggleFolder = async (folderId: string) => {
      const isOpen = openFolderIds.includes(folderId);
      if (isOpen) {
        return closeFolder(folderId);
      }
      await openFolder(folderId);
    };

    const closeFolder = (folderId: string) => {
      setOpenFolderIds(openFolderIds.filter((id) => id !== folderId));
    };

    const openFolder = (folderId: string) => {
      setOpenFolderIds([...openFolderIds, folderId]);
      return dispatch(getFoldersInFolderUseCase(folderId));
    };

    const toggleSelectFolder = (folderId?: string) => {
      const folder = !folderId ? 'root' : folderId;
      if (folder === selectedFolderId) {
        onChange();
        return;
      }
      onChange(folder);
    };

    const isRootSelected = selectedFolderId === 'root';

    return { folders, toggleFolder, toggleSelectFolder, isRootSelected };
  });
