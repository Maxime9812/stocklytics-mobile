import { SafeAreaView } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { clsx } from 'clsx';

type Props = PropsWithChildren<SafeAreaView['props']> & {
  variant?: 'primary' | 'secondary';
};

const BaseLayout = React.forwardRef(
  ({ children, variant = 'primary', ...props }: Props, ref) => {
    return (
      <SafeAreaView
        ref={ref as any}
        {...props}
        className={clsx(
          'h-screen flex-1',
          variant === 'primary' && 'bg-gray-50 dark:bg-black ',
          variant === 'secondary' && 'bg-gray-50 dark:bg-neutral-900',
          props.className,
        )}
      >
        {children}
      </SafeAreaView>
    );
  },
);

export default BaseLayout;
