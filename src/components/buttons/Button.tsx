import { Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { createContext, PropsWithChildren, useContext } from 'react';
import { clsx } from 'clsx';

type Variant = 'solid' | 'ghost';
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
      activeOpacity={0.6}
      className={clsx(
        props.disabled && 'opacity-50',
        'flex-row justify-center items-center space-x-1',
        variant == 'solid' && 'bg-royal-blue-500 rounded-full',
        size == 'md' && 'p-4',
        size == 'sm' && 'px-2',
        className,
      )}
    >
      <ButtonContext.Provider
        value={{ variant, disabled: props.disabled ?? false }}
      >
        {children}
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
        variant == 'ghost' && 'text-royal-blue-500',
      )}
    >
      {children}
    </Text>
  );
};
