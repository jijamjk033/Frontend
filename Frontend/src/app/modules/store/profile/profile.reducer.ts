import { createReducer, on } from "@ngrx/store";
import { Profile} from "../user";
import {fetchUserProfileAPISuccess } from "./profile.action";



export const profileinitial: Profile[] = []

export const _profileReducer = createReducer(
    profileinitial,
    on(fetchUserProfileAPISuccess, (_state, { profile }) => {
        return [...Object.values(profile)]
    })
)

export function profileReducer(state: any, action: any) {
    return _profileReducer(state, action)
}