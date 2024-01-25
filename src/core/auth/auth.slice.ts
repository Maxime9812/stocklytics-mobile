import { createSlice } from '@reduxjs/toolkit';
import { AuthUser } from './hexagon/models/auth-user';
import { loginUseCase } from './hexagon/usecases/login/login.usecase';

export type AuthSliceState = {
  currentUser?: AuthUser;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {} as AuthSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUseCase.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});
