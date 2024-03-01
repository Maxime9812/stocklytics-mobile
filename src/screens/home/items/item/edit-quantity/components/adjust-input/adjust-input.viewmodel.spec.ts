import { createAdjustInputViewModel } from './adjust-input.viewmodel';

describe('AdjustInputViewModel', () => {
  describe('decrease', () => {
    it('Should decrease value when call decrease', () => {
      let value: number | undefined = 0;
      const onChange = (newValue?: number) => {
        value = newValue;
      };
      const { decrease } = createAdjustInputViewModel({
        value,
        onChange,
      });

      decrease();

      expect(value).toBe(-1);
    });

    it('Should be able to decrease empty value', () => {
      let value = undefined;
      const onChange = (newValue?: number) => {
        value = newValue;
      };
      const { decrease } = createAdjustInputViewModel({
        value,
        onChange,
      });

      decrease();

      expect(value).toBe(-1);
    });
  });

  describe('increase', () => {
    it('Should increase value when call increase', () => {
      let value: number | undefined = 0;
      const onChange = (newValue?: number) => {
        value = newValue;
      };
      const { increase } = createAdjustInputViewModel({
        value,
        onChange,
      });

      increase();

      expect(value).toBe(1);
    });

    it('Should be able to increase empty value', () => {
      let value = undefined;
      const onChange = (newValue?: number) => {
        value = newValue;
      };
      const { increase } = createAdjustInputViewModel({
        value,
        onChange,
      });

      increase();

      expect(value).toBe(1);
    });
  });

  describe('manual entry', () => {
    it('Should change value when call onChange', () => {
      let value: number | undefined = 0;
      const onChange = (newValue?: number) => {
        value = newValue;
      };
      const { setValue } = createAdjustInputViewModel({
        value,
        onChange,
      });

      setValue('1');

      expect(value).toBe(1);
    });

    it('Should avoid non-numeric characters', () => {
      let value: number | undefined = 0;
      const onChange = (newValue?: number) => {
        value = newValue;
      };
      const { setValue } = createAdjustInputViewModel({
        value,
        onChange,
      });

      setValue('a');

      expect(value).toBe(0);
    });

    it('Should allow negative value', () => {
      let value: number | undefined = 0;
      const onChange = (newValue?: number) => {
        value = newValue;
      };
      const { setValue } = createAdjustInputViewModel({
        value,
        onChange,
      });

      setValue('-1');

      expect(value).toBe(-1);
    });

    it('Should be undefined when empty value', () => {
      let value: number | undefined = 0;
      const onChange = (newValue?: number) => {
        value = newValue;
      };
      const { setValue } = createAdjustInputViewModel({
        value,
        onChange,
      });

      setValue('');

      expect(value).toBeUndefined();
    });
  });

  describe('textValue', () => {
    it('Should return value as text', () => {
      let value: number | undefined = 0;
      const onChange = (newValue?: number) => {
        value = newValue;
      };
      const { textValue } = createAdjustInputViewModel({
        value,
        onChange,
      });

      expect(textValue).toBe('0');
    });
  });
});
