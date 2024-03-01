import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Button from '../../../../../../../components/buttons/Button';
import { createAdjustInputViewModel } from './adjust-input.viewmodel';
import BaseTextInput from '../../../../../../../components/inputs/BaseTextInput';
import * as Haptic from 'expo-haptics';

type AdjustInputProps = {
  value?: number;
  onChange: (value?: number) => void;
};

export default function AdjustInput({ value, onChange }: AdjustInputProps) {
  const { increase, decrease, setValue, textValue } =
    createAdjustInputViewModel({
      value,
      onChange: (value) => {
        void Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
        onChange(value);
      },
    });

  return (
    <View className="flex-row justify-between w-2/3 items-center m-auto">
      <ActionButton onPress={decrease} icon="minus" />
      <BaseTextInput
        keyboardType="numeric"
        value={textValue}
        onChangeText={setValue}
        placeholder="0"
        className="text-3xl"
      />
      <ActionButton onPress={increase} icon="plus" />
    </View>
  );
}

const ActionButton = ({
  onPress,
  icon,
}: {
  onPress: () => void;
  icon: string;
}) => (
  <Button variant="ghost" onPress={onPress}>
    <Button.Icon>
      <Feather name={icon as any} size={40} />
    </Button.Icon>
  </Button>
);
