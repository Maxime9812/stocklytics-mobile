type AdjustInputViewModelParams = {
  value?: number;
  onChange: (value?: number) => void;
};

export const createAdjustInputViewModel = ({
  value,
  onChange,
}: AdjustInputViewModelParams) => {
  const decrease = () => {
    onChange((value ?? 0) - 1);
  };

  const increase = () => {
    onChange((value ?? 0) + 1);
  };

  const setValue = (text: string) => {
    if (!text) return onChange(undefined);
    const escaped = text.replace(/[^0-9]/g, '');
    const isNegative = text.startsWith('-');
    const value = Number(escaped) * (isNegative ? -1 : 1);
    onChange(Number(value));
  };

  const textValue = value?.toString();

  return {
    decrease,
    increase,
    setValue,
    textValue,
  };
};
