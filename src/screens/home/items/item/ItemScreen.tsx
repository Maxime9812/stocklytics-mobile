import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ItemsStackScreenProps } from '../../../../navigation/ItemsNavigation';
import BaseLayout from '../../../../components/layouts/BaseLayout';
import Card from '../../../../components/cards/Card';
import { Feather } from '@expo/vector-icons';
import Button from '../../../../components/buttons/Button';
import { useSelector } from 'react-redux';
import {
  createItemScreenViewModel,
  ItemScreenViewModelLoaded,
} from './item-screen-viewmodel';
import { exhaustiveGuard } from '../../../../core/common/utils/exhaustive-guard';
import Badge from '../../../../components/badge/Badge';
import Barcode from '../../../../components/barcode/Barcode';

export default function ItemScreen({
  navigation,
  route: {
    params: { id },
  },
}: ItemsStackScreenProps<'Item'>) {
  const viewModel = useSelector(createItemScreenViewModel({ itemId: id }));

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
  viewModel: ItemScreenViewModelLoaded;
  navigation: ItemsStackScreenProps<'Item'>['navigation'];
};
const LoadedItemScreen = ({
  viewModel: { item },
  navigation,
}: LoadedItemScreenProps) => {
  const goToEditNote = () => {
    navigation.push('EditItemNote', { itemId: item.id, note: item.note });
  };

  const goToEditTags = () => {
    navigation.push('DeleteItem', { id: item.id });
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
        <View className="h-72 bg-neutral-200 dark:bg-neutral-700 justify-center items-center">
          <View className="space-y-2 p-10">
            <Text className="text-center dark:text-white text-lg">
              Enhance visibility with great images
            </Text>
            <Text className="text-center text-neutral-500 dark:text-neutral-400">
              Upload up to 8 images, with a total limit of 30 MB. Supported
              formats JPG and PNG
            </Text>

            <View className="flex-row justify-center">
              <View className="p-4 bg bg-white dark:bg-neutral-800 rounded-full">
                <Text className="text-center text-black dark:text-white">
                  <Feather name="image" size={20} />
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="px-3 pb-3 space-y-3">
          <Card className="-mt-4 space-y-2 p-3">
            <Text className="dark:text-white text-2xl font-bold">
              {item.name}
            </Text>

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
                  <Button.Text>Edit</Button.Text>
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
            <View className="min-h-14">
              {item.barcode && <Barcode barcode={item.barcode} />}
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
