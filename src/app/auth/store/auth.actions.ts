import {createAction, props} from "@ngrx/store";

export const login = createAction("LOGIN", props<{
  email: string,
  id: string,
  token: string,
  tokenExpiryDate: Date
}>());

export const logout = createAction("LOGOUT")
