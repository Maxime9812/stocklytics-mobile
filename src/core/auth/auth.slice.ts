import { createAction, createSlice } from '@reduxjs/toolkit';
import { AuthUser } from './hexagon/models/auth-user';
import { loginUseCase } from './hexagon/usecases/login/login.usecase';
import { RootState } from '../create-store';
import { logoutUseCase } from './hexagon/usecases/logout/logout.usecase';
import { registerUseCase } from './hexagon/usecases/register/register.usecase';

export type AuthSliceState = {
  authUser?: AuthUser;
  hasCheckedAuthState: boolean;
};

const initialState: AuthSliceState = {
  hasCheckedAuthState: false,
};

export const userAuthenticated = createAction<AuthUser | undefined>(
  'auth/userAuthenticated',
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUseCase.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.hasCheckedAuthState = true;
      })
      .addCase(userAuthenticated, (state, action) => {
        state.authUser = action.payload;
        state.hasCheckedAuthState = true;
      })
      .addCase(logoutUseCase.fulfilled, (state) => {
        state.authUser = undefined;
        state.hasCheckedAuthState = true;
      })
      .addCase(registerUseCase.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.hasCheckedAuthState = true;
      });
  },
});

export const isAuthSelector = (state: RootState) => !!authUserSelector(state);
export const authUserSelector = (state: RootState) => state.auth.authUser;

export const hasCheckedAuthStateSelector = (state: RootState) =>
  state.auth.hasCheckedAuthState;
