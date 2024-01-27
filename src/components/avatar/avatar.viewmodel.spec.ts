import { createAvatarViewModel } from './avatar.viewmodel';

describe('AvatarViewModel', () => {
  it.each([
    { name: 'John', initialsExpected: 'J' },
    { name: 'John Doe', initialsExpected: 'JD' },
    { name: 'john doe', initialsExpected: 'JD' },
    { name: 'John Le Doe', initialsExpected: 'JL' },
  ])('should display initials', ({ name, initialsExpected }) => {
    const { initials } = createAvatarViewModel({ name });
    expect(initials).toBe(initialsExpected);
  });
});
