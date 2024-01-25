import { SafeAreaView } from 'react-native';
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return <SafeAreaView className="bg-white">{children}</SafeAreaView>;
}
