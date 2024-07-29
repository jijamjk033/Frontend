import { createReducer, on } from "@ngrx/store";
import { User } from "../user";
import { fetchUserAPISuccess} from "./user.action";

export const initalState: User[] = []

export const _userReducer = createReducer(
    initalState,
    on(fetchUserAPISuccess, (_state, { allUser }) => {
        return Object.values(allUser[0])
    })
)

export function userReducer(state: any, action: any) {
    return _userReducer(state, action);
}
