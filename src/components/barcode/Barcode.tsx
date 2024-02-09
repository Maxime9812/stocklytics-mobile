import {
  Barcode as BarcodeModel,
  BarcodeType,
} from '../../core/items/hexagon/models/barcode';
import { Image, View } from 'react-native';
import 'react-zlib-js';
import { useEffect, useState } from 'react';
import bwipjs from 'bwip-js/react-native';

type Props = {
  barcode: BarcodeModel;
};

export default function Barcode({ barcode }: Props) {
  const [img, setImg] = useState<any>(undefined);

  const getImage = async (type: BarcodeType, value: string) => {
    const i = await bwipjs.toDataURL({
      bcid: type,
      text: value,
      scale: 2,
      height: 12,
      includetext: true,
      textxalign: 'center',
    });
    setImg(i);
  };

  useEffect(() => {
    getImage(barcode.type, barcode.value);
  }, []);

  return (
    <View className="bg-white justify-center items-center p-2 rounded-xl">
      {img && (
        <Image
          style={{ width: img.width, height: img.height }}
          source={{ uri: img.uri }}
        />
      )}
    </View>
  );
}
