import { AuthUser } from '../models/auth-user';

export const authUserBuilder = (
  authUser: AuthUser = {
    id: 'user-id',
    email: 'john.doe@gmail.com',
    fullName: 'John Doe',
  },
) => {
  return {
    withId: (id: string) => authUserBuilder({ ...authUser, id }),
    withEmail: (email: string) => authUserBuilder({ ...authUser, email }),
    withFullName: (fullName: string) =>
      authUserBuilder({ ...authUser, fullName }),
    build: () => authUser,
  };
};
