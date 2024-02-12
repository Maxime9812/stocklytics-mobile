import { Barcode as BarcodeModel } from '../../core/items/hexagon/models/barcode';
import { Image, View } from 'react-native';
import { useBwip } from './useBwip';

type Props = {
  barcode: BarcodeModel;
};

export default function Barcode({ barcode }: Props) {
  const { img } = useBwip({
    bcid: barcode.type,
    text: barcode.value,
    scale: 2,
    height: 12,
    includetext: true,
    textxalign: 'center',
  });

  return (
    <>
      {img && (
        <View className="bg-white justify-center items-center py-4 px-8 rounded-xl">
          <Image
            style={{ width: img.width, height: img.height }}
            source={{ uri: img.uri }}
          />
        </View>
      )}
    </>
  );
}
