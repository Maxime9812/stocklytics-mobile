import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { createFolderSelectionInputViewModel } from './folder-selection-input.viewmodel';
import { useAppDispatch } from '../../../store-hooks';
import { useState } from 'react';
import Button from '../../buttons/Button';
import { Feather } from '@expo/vector-icons';
import Card from '../../cards/Card';
import { clsx } from 'clsx';

type Props = {
  value?: string;
  onChange: (folderId?: string) => void;
};

export default function FolderSelectionInput({ value, onChange }: Props) {
  const dispatch = useAppDispatch();
  const [openFolderIds, setOpenFolderIds] = useState<string[]>([]);
  const { folders, toggleFolder, toggleSelectFolder } = useSelector(
    createFolderSelectionInputViewModel({
      dispatch,
      openFolderIds,
      setOpenFolderIds,
      selectedFolderId: value,
      onChange,
    }),
  );

  const generateFolders = (values: typeof folders) => (
    <View className="flex-row">
      <View className="w-0.5 bg-neutral-500 dark:bg-neutral-400 rounded-full"></View>
      <View className="flex-1">
        {values.map((folder) => (
          <View key={folder.id} className="space-x-4">
            <View className="flex-row items-center">
              <Button variant="ghost" onPress={() => toggleFolder(folder.id)}>
                <Button.Icon
                  className={clsx(folder.isSelected && 'text-royal-blue-500')}
                >
                  <Feather
                    name={folder.isOpen ? 'folder-minus' : 'folder-plus'}
                    size={24}
                  />
                </Button.Icon>
              </Button>

              <Button
                variant="ghost"
                onPress={() => toggleSelectFolder(folder.id)}
                className="flex-1 pl-0"
              >
                <Button.Text
                  className={clsx(folder.isSelected && 'text-royal-blue-500')}
                >
                  {folder.name}
                </Button.Text>
              </Button>
            </View>
            {folder.isOpen && generateFolders(folder.folders)}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <Card type="secondary" className="p-3 flex-1">
      {generateFolders(folders)}
    </Card>
  );
}
