import React from 'react';
import { Text, View } from 'react-native';
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

export default function ItemScreen({
  route: {
    params: { id },
  },
}: ItemsStackScreenProps<'Item'>) {
  const viewModel = useSelector(createItemScreenViewModel({ itemId: id }));

  switch (viewModel.type) {
    case 'loaded':
      return <LoadedItemScreen {...viewModel} />;
    case 'loading':
      return (
        <BaseLayout>
          <View>
            <Text>Error</Text>
          </View>
        </BaseLayout>
      );
    default:
      return exhaustiveGuard(viewModel);
  }
}

const LoadedItemScreen = ({ item }: ItemScreenViewModelLoaded) => {
  return (
    <BaseLayout>
      <View className="p-2 space-y-2">
        <Text className="dark:text-white text-2xl font-bold">{item.name}</Text>

        <Button variant="link" onPress={() => console.log('')}>
          <Button.Icon>
            <Feather name="folder" />
          </Button.Icon>

          <Button.Text>Electronics</Button.Text>
        </Button>
        <View className="flex-row space-x-2">
          <Card className="p-3 flex-1">
            <Card.Header className="justify-between">
              <Text className="text-neutral-500 dark:text-neutral-400">
                Quantity
              </Text>
              <Button variant="link" onPress={() => console.log('')}>
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
                Updated at
              </Text>
            </Card.Header>
            <Text className="dark:text-white">
              {item.createdAt.toISOString()}
            </Text>
          </Card>
        </View>
        <Card className="p-3">
          <Card.Header className="justify-between">
            <Text className="text-neutral-500 dark:text-neutral-400">Note</Text>
            <View>
              <Button variant="link" onPress={() => console.log('')}>
                <Button.Icon>
                  <Feather name="plus" />
                </Button.Icon>
                <Button.Text>Add a note</Button.Text>
              </Button>
            </View>
          </Card.Header>
          <View>
            <Text className="dark:text-white">{item.note}</Text>
          </View>
        </Card>
        <Card className="p-3">
          <Card.Header className="justify-between">
            <Text className="text-neutral-500 dark:text-neutral-400">
              Barcode
            </Text>
            <Button variant="link" onPress={() => console.log('')}>
              <Button.Icon>
                <Feather name="camera" />
              </Button.Icon>
              <Button.Text>Link barcode</Button.Text>
            </Button>
          </Card.Header>
          <View className="h-14"></View>
        </Card>
      </View>
    </BaseLayout>
  );
};
