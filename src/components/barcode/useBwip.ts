import bwipjs from 'bwip-js/react-native';
import { useEffect, useState } from 'react';
import 'react-zlib-js';

type UseBwipParams = bwipjs.RenderOptions;

export const useBwip = (options: UseBwipParams) => {
  const [img, setImg] = useState<bwipjs.DataURL | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const generateImage = async (options: UseBwipParams) => {
    try {
      setError(undefined);
      const i = await bwipjs.toDataURL(options);
      setImg(i);
    } catch (e) {
      setError(e as Error);
    }
  };

  useEffect(() => {
    generateImage(options);
  }, [options.text, options.bcid]);

  return { img, error };
};
