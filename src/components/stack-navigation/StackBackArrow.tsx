import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../hooks/use-theme';

type Props = {
  canGoBack: boolean;
};
export default function StackBackArrow({ canGoBack }: Props) {
  const { goBack } = useNavigation();
  const { theme } = useTheme();
  return (
    <>
      {canGoBack && (
        <TouchableOpacity onPress={() => goBack()}>
          <Feather
            name="arrow-left"
            size={24}
            color={theme == 'dark' ? 'white' : 'black'}
          />
        </TouchableOpacity>
      )}
    </>
  );
}
