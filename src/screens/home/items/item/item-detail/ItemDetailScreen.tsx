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
    navigation.push('DeleteItem', { id: item.id });
  };

  const goToScanBarcode = () => {
    navigation.push('LinkBarcode', { itemId: item.id });
  };

  const goToDeleteItem = () => {
    navigation.push('DeleteItem', { id: item.id });
  };

  return (
    <BaseLayout>
      <ScrollView>
        <ItemPhotos />
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
                <Button.Text>Edit name</Button.Text>
              </Button>
            </Card.Header>

            <Button variant="link" onPress={() => console.log('')}>
              <Button.Icon>
                <Feather name="folder" />
              </Button.Icon>

              <Button.Text>Electronics</Button.Text>
            </Button>
          </Card>

          <View className="flex-row space-x-2">
            <Card className="p-3 flex-1">
              <Card.Header className="justify-between">
                <Text className="text-neutral-500 dark:text-neutral-400">
                  Quantity
                </Text>
                <Button variant="link" onPress={goToEditQuantity}>
                  <Button.Icon>
                    <Feather name="edit" />
                  </Button.Icon>
                  <Button.Text>Edit quantity</Button.Text>
                </Button>
              </Card.Header>
              <Text className="dark:text-white">{item.quantity}</Text>
            </Card>
            <Card className="p-3 flex-1">
              <Card.Header>
                <Text className="text-neutral-500 dark:text-neutral-400">
                  Created at
                </Text>
              </Card.Header>
              <Text className="dark:text-white">{item.createdAt}</Text>
            </Card>
          </View>

          <Card className="p-3">
            <Card.Header className="justify-between">
              <Text className="text-neutral-500 dark:text-neutral-400">
                Tags
              </Text>
              <View>
                <Button variant="link" onPress={goToEditTags}>
                  <Button.Icon>
                    <Feather name="edit" />
                  </Button.Icon>
                  <Button.Text>Edit tags</Button.Text>
                </Button>
              </View>
            </Card.Header>
            <View className="flex-row space-x-2">
              {item.tags.map((tag) => (
                <Badge key={tag.id}>{tag.name}</Badge>
              ))}
            </View>
          </Card>

          <Card className="p-3">
            <Card.Header className="justify-between">
              <Text className="text-neutral-500 dark:text-neutral-400">
                Barcode
              </Text>
              <Button variant="link" onPress={goToScanBarcode}>
                <Button.Icon>
                  <Feather name="camera" />
                </Button.Icon>
                <Button.Text>Link barcode</Button.Text>
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
                    <Button.Text>Unlink</Button.Text>
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
                    {item.hasNote ? 'Edit note' : 'Add a note'}
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
              <Button.Text>Delete</Button.Text>
            </Button>
          </Card>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};
