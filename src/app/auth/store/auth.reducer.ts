import {createReducer, on} from "@ngrx/store";
import {User} from "../user.model";
import {authFailed, authSuccess, loginStart, logout, signupStart} from "./auth.actions";

export interface State {
  user: User | null;
  isLoading: boolean;
  authError: string | null;
}

const initialState: State = {
  user: null,
  isLoading: false,
  authError: null
}

export const authReducer = createReducer(initialState,
  on(authSuccess, (state, {email, id, token, tokenExpiryDate}) => ({
    ...state,
    isLoading: false,
    user: new User(id, email, token, tokenExpiryDate)
  })),
  on(logout, state => ({...state, user: null, isLoading: false})),
  on(loginStart, state => ({...state, isLoading: true, authError: null})),
  on(authFailed, (state, {error}) => ({...state, authError: error, isLoading: false, user: null})),
  on(signupStart, state => ({...state, isLoading: true, authError: null, user: null})),
)
