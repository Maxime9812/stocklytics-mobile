import { rootReducer } from './root-reducer';
import {
  ActionCreatorWithPayload,
  createAction,
  createReducer,
} from '@reduxjs/toolkit';
import { AuthUser } from './auth/hexagon/models/auth-user';

const initialState = rootReducer(undefined, createAction('')());

const withAuthUser = createAction<AuthUser>('withAuthUser');

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(withAuthUser, (state, action) => {
    state.auth.authUser = action.payload;
    state.auth.hasCheckedAuthState = true;
  });
});

export const stateBuilder = (baseState = initialState) => {
  const reduce =
    <T>(actionCreator: ActionCreatorWithPayload<T>) =>
    (payload: T) =>
      stateBuilder(reducer(baseState, actionCreator(payload)));

  return {
    withAuthUser: reduce(withAuthUser),
    build: () => baseState,
  };
};
