import React from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';

export default function CloseKeyboardOnTouch({
  children,
}: React.PropsWithChildren) {
  return (
    <TouchableOpacity
      activeOpacity={100}
      onPress={Keyboard.dismiss}
      className="flex-1"
    >
      {children}
    </TouchableOpacity>
  );
}
