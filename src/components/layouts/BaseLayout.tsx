import { SafeAreaView } from 'react-native';
import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<SafeAreaView['props']>;

const BaseLayout = React.forwardRef(({ children, ...props }: Props, ref) => {
  return (
    <SafeAreaView
      ref={ref as any}
      {...props}
      className={`bg-gray-50 dark:bg-black h-screen ${props.className}`}
    >
      {children}
    </SafeAreaView>
  );
});

export default BaseLayout;
