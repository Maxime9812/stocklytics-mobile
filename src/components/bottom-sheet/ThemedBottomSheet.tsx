import React, { forwardRef, PropsWithChildren } from 'react';
import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';
import { useTheme } from '../../hooks/use-theme';
import { TouchableWithoutFeedback, useWindowDimensions } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import Animated, {
  SharedValue,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { getOverlayOpacity } from './get-overlay-opacity';

type Props = PropsWithChildren<BottomSheetProps & { withOverlay?: boolean }>;

const ThemedBottomSheet = forwardRef(
  ({ children, withOverlay = false, ...props }: Props, ref) => {
    const { theme } = useTheme();
    const animatedPosition = useSharedValue(0);

    return (
      <FullWindowOverlay>
        {withOverlay && (
          <Overlay
            onPress={() => (ref as any).current.close()}
            animatedPosition={animatedPosition}
          />
        )}
        <BottomSheet
          ref={ref as any}
          {...props}
          handleIndicatorStyle={{
            backgroundColor: theme == 'dark' ? 'white' : 'black',
          }}
          backgroundStyle={{
            backgroundColor: theme == 'dark' ? '#171717' : '#f9fafb',
          }}
          animatedPosition={animatedPosition}
        >
          {children}
        </BottomSheet>
      </FullWindowOverlay>
    );
  },
);

type OverLayProps = {
  onPress: () => void;
  animatedPosition: SharedValue<number>;
};
const Overlay = ({ onPress, animatedPosition }: OverLayProps) => {
  const { height: screenHeight } = useWindowDimensions();

  const opacity = useDerivedValue(() => {
    return getOverlayOpacity({
      screenHeight,
      position: animatedPosition.value,
      maxPercentageOfScreen: 0.8,
      opacityMax: 0.4,
    });
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        className="flex-1 bg-black opacity-40"
        style={{ opacity }}
      ></Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ThemedBottomSheet;
