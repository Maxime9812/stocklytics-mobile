import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

type Variant = 'back' | 'close';

type Props = {
  canGoBack: boolean;
  variant?: Variant;
};

const Icon = styled(Feather, 'dark:text-white text-2xl');

const variants: Record<Variant, any> = {
  back: 'arrow-left',
  close: 'x',
};

export default function StackBackButton({
  canGoBack,
  variant = 'back',
}: Props) {
  const { goBack } = useNavigation();
  return (
    <>
      {canGoBack && (
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name={variants[variant]} />
        </TouchableOpacity>
      )}
    </>
  );
}
