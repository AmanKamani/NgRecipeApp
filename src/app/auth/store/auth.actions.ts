import {createAction, props} from "@ngrx/store";

const feature = "[Auth]"
export const authSuccess = createAction(`${feature} Auth Success`, props<{
  email: string,
  id: string,
  token: string,
  tokenExpiryDate: Date
}>());

export const logout = createAction(`${feature} Logout`)

export const loginStart = createAction(`${feature} Login Start`, props<{
  email: string,
  password: string
}>());

export const authFailed = createAction(`${feature} Auth Failed`, props<{ error: string }>());

export const signupStart = createAction(`${feature} Signup Start`, props<{
  email: string,
  password: string
}>());
