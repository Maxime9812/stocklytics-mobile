import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import ItemPhotos from './components/ItemPhotos';
import { ItemsStackScreenProps } from '../../../../../navigation/ItemsNavigation';
import { useAppDispatch } from '../../../../../store-hooks';
import BaseLayout from '../../../../../components/layouts/BaseLayout';
import {
  createItemDetailScreenViewModel,
  ItemDetailScreenViewModelLoaded,
} from './item-detail-screen-viewmodel';
import { exhaustiveGuard } from '../../../../../core/common/utils/exhaustive-guard';
import Card from '../../../../../components/cards/Card';
import Button from '../../../../../components/buttons/Button';
import Badge from '../../../../../components/badge/Badge';
import Barcode from '../../../../../components/barcode/Barcode';
import { useTranslation } from 'react-i18next';

export default function ItemDetailScreen({
  navigation,
  route: {
    params: { id },
  },
}: ItemsStackScreenProps<'ItemDetails'>) {
  const dispatch = useAppDispatch();
  const viewModel = useSelector(
    createItemDetailScreenViewModel({ itemId: id, dispatch }),
  );

  switch (viewModel.type) {
    case 'loaded':
      return <LoadedItemScreen viewModel={viewModel} navigation={navigation} />;
    case 'loading':
      return (
        <BaseLayout>
          <Text>Loading</Text>
        </BaseLayout>
      );
    default:
      return exhaustiveGuard(viewModel);
  }
}

type LoadedItemScreenProps = {
  viewModel: ItemDetailScreenViewModelLoaded;
  navigation: ItemsStackScreenProps<'ItemDetails'>['navigation'];
};
const LoadedItemScreen = ({
  viewModel: { item },
  navigation,
}: LoadedItemScreenProps) => {
  const { t } = useTranslation('home');
  const goToEditName = () => {
    navigation.push('EditItemName', { itemId: item.id });
  };

  const goToEditNote = () => {
    navigation.push('EditItemNote', { itemId: item.id, note: item.note });
  };

  const goToEditTags = () => {
    navigation.push('EditItemTags', { itemId: item.id });
  };

  const goToEditQuantity = () => {
    navigation.push('EditItemQuantity', { itemId: item.id });
  };

  const goToScanBarcode = () => {
    navigation.push('LinkBarcode', { itemId: item.id });
  };

  const goToDeleteItem = () => {
    navigation.push('DeleteItem', { id: item.id });
  };

  const goToParentFolder = () => {
    navigation.replace('Folder', { id: item.folder?.id });
  };

  return (
    <BaseLayout>
      <ScrollView>
        <ItemPhotos
          itemId={item.id}
          image={item.image}
          deleteImage={item.deleteImage}
          addImage={item.addImage}
        />
        <View className="px-3 pb-3 space-y-3">
          <Card className="-mt-4 space-y-2 p-3">
            <Card.Header className="justify-between">
              <Text className="dark:text-white text-2xl font-bold">
                {item.name}
              </Text>
              <Button variant="link" onPress={goToEditName}>
                <Button.Icon>
                  <Feather name="edit" />
                </Button.Icon>
                <Button.Text>{t('itemDetails.editName')}</Button.Text>
              </Button>
            </Card.Header>

            <Button variant="link" onPress={goToParentFolder}>
              <Button.Icon>
                <Feather name="folder" />
              </Button.Icon>

              <Button.Text>
                {item.folder ? item.folder.name : 'Root'}
              </Button.Text>
            </Button>
          </Card>

          <View className="flex-row space-x-2">
            <Card className="p-3 flex-1">
              <Card.Header className="justify-between">
                <Text className="text-neutral-500 dark:text-neutral-400">
                  {t('itemDetails.quantity.name')}
                </Text>
                <Button variant="link" onPress={goToEditQuantity}>
                  <Button.Icon>
                    <Feather name="edit" />
                  </Button.Icon>
                  <Button.Text>{t('itemDetails.quantity.edit')}</Button.Text>
                </Button>
              </Card.Header>
              <Text className="dark:text-white">{item.quantity}</Text>
            </Card>
            <Card className="p-3 flex-1">
              <Card.Header>
                <Text className="text-neutral-500 dark:text-neutral-400">
                  {t('itemDetails.createdAt')}
                </Text>
              </Card.Header>
              <Text className="dark:text-white">{item.createdAt}</Text>
            </Card>
          </View>

          <Card className="p-3">
            <Card.Header className="justify-between">
              <Text className="text-neutral-500 dark:text-neutral-400">
                {t('itemDetails.tags.name')}
              </Text>
              <View>
                <Button variant="link" onPress={goToEditTags}>
                  <Button.Icon>
                    <Feather name="edit" />
                  </Button.Icon>
                  <Button.Text>{t('itemDetails.tags.edit')}</Button.Text>
                </Button>
              </View>
            </Card.Header>
            <View>
              <View className="flex-row flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag.id}>{tag.name}</Badge>
                ))}
              </View>
            </View>
          </Card>

          <Card className="p-3">
            <Card.Header className="justify-between">
              <Text className="text-neutral-500 dark:text-neutral-400">
                {t('itemDetails.barcode.name')}
              </Text>
              <Button variant="link" onPress={goToScanBarcode}>
                <Button.Icon>
                  <Feather name="camera" />
                </Button.Icon>
                <Button.Text>{t('itemDetails.barcode.link')}</Button.Text>
              </Button>
            </Card.Header>
            <View className="items-center space-y-2">
              {item.barcode && (
                <>
                  <Barcode barcode={item.barcode} />
                  <Button
                    type="destructive"
                    variant="link"
                    onPress={item.unlinkBarcode}
                  >
                    <Button.Text>{t('itemDetails.barcode.unlink')}</Button.Text>
                  </Button>
                </>
              )}
            </View>
          </Card>

          <Card className="p-3">
            <Card.Header className="justify-between">
              <Text className="text-neutral-500 dark:text-neutral-400">
                Note
              </Text>
              <View>
                <Button variant="link" onPress={goToEditNote}>
                  <Button.Icon>
                    <Feather name={item.hasNote ? 'edit' : 'plus'} />
                  </Button.Icon>
                  <Button.Text>
                    {item.hasNote
                      ? t('itemDetails.note.edit')
                      : t('itemDetails.note.add')}
                  </Button.Text>
                </Button>
              </View>
            </Card.Header>
            <View>
              <Text className="dark:text-white">{item.note}</Text>
            </View>
          </Card>

          <Card className="p-1">
            <Button
              variant="ghost"
              type="destructive"
              className="p-3"
              onPress={goToDeleteItem}
            >
              <Button.Text>{t('itemDetails.delete')}</Button.Text>
            </Button>
          </Card>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};
