export const createAvatarViewModel = ({ name }: { name: string }) => {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return {
    initials,
  };
};
