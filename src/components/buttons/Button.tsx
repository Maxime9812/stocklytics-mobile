import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { createContext, PropsWithChildren, useContext } from 'react';
import { clsx } from 'clsx';

type Variant = 'solid' | 'ghost' | 'link' | 'destructive';
type Size = 'sm' | 'md';

export type ButtonProps = PropsWithChildren<
  {
    variant?: Variant;
    size?: Size;
  } & TouchableHighlight['props']
>;

type ButtonContextType = {
  variant: Variant;
  disabled: boolean;
};

const ButtonContext = createContext<ButtonContextType>({
  variant: 'solid',
  disabled: false,
});

export default function Button({
  children,
  className,
  variant = 'solid',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={1}
      className={clsx(
        props.disabled && 'opacity-50',
        variant == 'solid' &&
          'bg-royal-blue-500 rounded-full active:bg-royal-blue-700 flex-row justify-center',
        variant == 'solid' && size == 'md' && 'p-4',
        variant == 'solid' && size == 'sm' && 'px-2',
        variant == 'ghost' &&
          'active:bg-neutral-100 dark:active:bg-neutral-800 rounded-xl p-2',
        variant == 'destructive' && 'bg-red-500 active:bg-red-700',
        variant == 'link' && 'active:opacity-40',
        className,
      )}
    >
      <ButtonContext.Provider
        value={{ variant, disabled: props.disabled ?? false }}
      >
        <View
          className={clsx(
            'flex-row items-center space-x-2',
            size == 'sm' && 'space-x-1',
          )}
        >
          {children}
        </View>
      </ButtonContext.Provider>
    </TouchableOpacity>
  );
}

Button.Text = ({ children, ...props }: PropsWithChildren<Text['props']>) => {
  const { variant } = useContext(ButtonContext);
  return (
    <Text
      {...props}
      className={clsx(
        'text-center',
        variant == 'solid' && 'text-white',
        variant == 'link' && 'text-royal-blue-500',
        variant == 'ghost' && 'dark:text-white',
      )}
    >
      {children}
    </Text>
  );
};

Button.Icon = ({ children, ...props }: PropsWithChildren<View['props']>) => {
  const { variant } = useContext(ButtonContext);
  return (
    <Text
      {...props}
      className={clsx(
        variant == 'solid' && 'text-white',
        variant == 'link' && 'text-royal-blue-500',
        variant == 'ghost' && 'dark:text-white',
      )}
    >
      {children}
    </Text>
  );
};
