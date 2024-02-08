import { TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { clsx } from 'clsx';
import Button from '../buttons/Button';

type Variant = 'back' | 'close';

type Props = TouchableOpacity['props'] & {
  canGoBack: boolean;
  variant?: Variant;
};

const variants: Record<Variant, any> = {
  back: 'arrow-left',
  close: 'x',
};

export default function StackBackButton({
  canGoBack,
  variant = 'back',
  className,
  ...props
}: Props) {
  const { goBack } = useNavigation();
  return (
    <View className="flex-row">
      {canGoBack && (
        <Button
          variant="ghost"
          {...props}
          className={clsx(className, 'active:bg-transparent')}
          onPress={() => goBack()}
        >
          <Button.Icon>
            <Feather name={variants[variant]} size={26} />
          </Button.Icon>
        </Button>
      )}
    </View>
  );
}
