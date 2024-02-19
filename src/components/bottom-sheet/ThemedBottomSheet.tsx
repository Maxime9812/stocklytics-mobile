import { forwardRef, PropsWithChildren } from 'react';
import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';
import { useTheme } from '../../hooks/use-theme';

const ThemedBottomSheet = forwardRef(
  ({ children, ...props }: PropsWithChildren<BottomSheetProps>, ref) => {
    const { theme } = useTheme();

    return (
      <BottomSheet
        ref={ref as any}
        {...props}
        handleIndicatorStyle={{
          backgroundColor: theme == 'dark' ? 'white' : 'black',
        }}
        backgroundStyle={{
          backgroundColor: theme == 'dark' ? '#171717' : '#f9fafb',
        }}
      >
        {children}
      </BottomSheet>
    );
  },
);

export default ThemedBottomSheet;
