import { SafeAreaView } from 'react-native';
import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const BaseLayout = React.forwardRef(({ children }: Props, ref) => {
  return (
    <SafeAreaView
      ref={ref as any}
      className="bg-gray-50 dark:bg-black h-screen"
    >
      {children}
    </SafeAreaView>
  );
});

export default BaseLayout;
