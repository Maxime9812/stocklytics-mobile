import { TextInput } from 'react-native';
import React from 'react';

type Props = TextInput['props'];
const BaseTextInput = React.forwardRef((props: Props, ref) => {
  return (
    <TextInput
      ref={ref as any}
      {...props}
      className={`bg-gray-100 rounded-xl p-4 focus:bg-gray-200 dark:bg-neutral-800 dark:focus:bg-neutral-700 dark:text-white ${props.className}`}
    />
  );
});

export default BaseTextInput;
