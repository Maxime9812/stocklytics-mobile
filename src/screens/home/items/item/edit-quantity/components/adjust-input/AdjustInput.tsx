import { Text, View } from 'react-native';
import { PropsWithChildren } from 'react';
import { Feather } from '@expo/vector-icons';
import Button from '../../../../../../../components/buttons/Button';
import { createAdjustInputViewModel } from './adjust-input.viewmodel';
import BaseTextInput from '../../../../../../../components/inputs/BaseTextInput';

type AdjustInputProps = {
  value?: number;
  onChange: (value?: number) => void;
};

export default function AdjustInput({ value, onChange }: AdjustInputProps) {
  const { increase, decrease, setValue, textValue } =
    createAdjustInputViewModel({
      value,
      onChange,
    });

  return (
    <View className="flex-row justify-between w-2/3 items-center m-auto">
      <Button variant="ghost" onPress={decrease}>
        <Button.Icon>
          <Feather name="minus" size={40} />
        </Button.Icon>
      </Button>
      <BaseTextInput
        keyboardType="numeric"
        value={textValue}
        onChangeText={setValue}
        placeholder="0"
        className="text-3xl"
      />
      <Button variant="ghost" onPress={increase}>
        <Button.Icon>
          <Feather name="plus" size={40} />
        </Button.Icon>
      </Button>
    </View>
  );
}

const Value = ({ children }: PropsWithChildren) => (
  <Text className="text-3xl dark:text-white">{children}</Text>
);
