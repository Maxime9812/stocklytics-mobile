import React, { useEffect, useState } from 'react';
import { HomeTabScreenProps } from '../../../navigation/HomeNavigation';
import Scanner from '../../../components/camera/Scanner';

export default function ScanScreen({ navigation }: HomeTabScreenProps<'Scan'>) {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      setIsActive(true);
    });
  }, []);

  useEffect(() => {
    return navigation.addListener('blur', () => {
      setIsActive(false);
    });
  }, []);

  return <Scanner onCodeScanned={() => {}} isActive={isActive} />;
}
