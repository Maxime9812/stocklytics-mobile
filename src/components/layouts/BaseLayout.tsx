import { SafeAreaView } from 'react-native';
import { PropsWithChildren } from 'react';

export default function BaseLayout({ children }: PropsWithChildren) {
  return <SafeAreaView className="bg-white h-screen">{children}</SafeAreaView>;
}
