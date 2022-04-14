import {createReducer, on} from "@ngrx/store";
import {User} from "../user.model";
import {login, logout} from "./auth.actions";

export interface State {
  user: User | null;
}

const initialState: State = {
  user: null
}

export const authReducer = createReducer(initialState,
  on(login, (state, {email, id, token, tokenExpiryDate}) => ({
    ...state,
    user: new User(id, email, token, tokenExpiryDate)
  })),
  on(logout, state => ({...state, user: null}))
)
