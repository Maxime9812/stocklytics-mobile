export const getOverlayOpacity = ({
  screenHeight,
  position,
  opacityMax = 1,
  maxPercentageOfScreen = 0.9,
}: {
  screenHeight: number;
  position: number;
  opacityMax?: number;
  maxPercentageOfScreen?: number;
}) => {
  'worklet'; // Required for reanimated
  const screenPercentToReach = screenHeight * maxPercentageOfScreen;
  const hasReachMaxScreen = position <= screenPercentToReach;
  if (hasReachMaxScreen) return opacityMax;

  return (
    (opacityMax * (screenHeight - position)) /
    (screenHeight - screenPercentToReach)
  );
};
