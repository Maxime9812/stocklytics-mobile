import { getOverlayOpacity } from './get-overlay-opacity';

describe('Get overlay opacity', () => {
  it('Should be 0 when is at bottom', () => {
    expect(
      getOverlayOpacity({
        screenHeight: 1000,
        position: 1000,
      }),
    ).toEqual(0);
  });

  describe('Position is under max percentage of screen', () => {
    it.each([
      {
        screenHeight: 1000,
        position: 950,
        expected: 0.5,
      },
      {
        screenHeight: 1000,
        position: 980,
        expected: 0.2,
      },
      {
        screenHeight: 1000,
        position: 920,
        expected: 0.8,
      },
    ])(
      'Should be % of the rest of screen',
      ({ screenHeight, position, expected }) => {
        expect(
          getOverlayOpacity({
            screenHeight,
            position,
          }),
        ).toEqual(expected);
      },
    );

    it.each([
      {
        screenHeight: 1000,
        position: 950,
        opacityMax: 0.5,
        expected: 0.25,
      },
    ])(
      'Should be % of the rest of screen based on max opacity',
      ({ screenHeight, position, expected, opacityMax }) => {
        expect(
          getOverlayOpacity({
            screenHeight,
            position,
            opacityMax,
          }),
        ).toEqual(expected);
      },
    );

    it('Should be maximum allowed when is at maximum', () => {
      expect(
        getOverlayOpacity({
          screenHeight: 1000,
          position: 900,
          opacityMax: 0.5,
        }),
      ).toEqual(0.5);
    });
  });

  describe('Position max percentage or more of screen', () => {
    it.each([
      {
        screenHeight: 1000,
        position: 900,
      },
      {
        screenHeight: 100,
        position: 90,
      },
    ])(
      'Should be maximum when is at 90% of screen',
      ({ screenHeight, position }) => {
        expect(
          getOverlayOpacity({
            screenHeight,
            position,
          }),
        ).toEqual(1);
      },
    );

    it('Should be maximum when is more than 90% of screen', () => {
      expect(
        getOverlayOpacity({
          screenHeight: 1000,
          position: 800,
        }),
      ).toEqual(1);
    });
    it('Should be maximum allowed when is at maximum', () => {
      expect(
        getOverlayOpacity({
          screenHeight: 1000,
          position: 800,
          opacityMax: 0.5,
        }),
      ).toEqual(0.5);
    });
  });
});
