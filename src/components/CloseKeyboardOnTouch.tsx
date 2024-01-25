import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function CloseKeyboardOnTouch({
  children,
}: React.PropsWithChildren) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  );
}
