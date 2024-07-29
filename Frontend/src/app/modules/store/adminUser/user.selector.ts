import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../user";


export const userSelectorState = createFeatureSelector<User[]>('users')


export const userSelectorData = createSelector(
    userSelectorState,
    (state: User[]) => {
        return state
    }
) 