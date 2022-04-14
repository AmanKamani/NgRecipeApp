import {createAction, props} from "@ngrx/store";

const feature = "[Auth]"
export const login = createAction(`${feature} Login`, props<{
  email: string,
  id: string,
  token: string,
  tokenExpiryDate: Date
}>());

export const logout = createAction(`${feature} Logout`)
