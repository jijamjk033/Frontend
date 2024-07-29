import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Profile} from "../user";

export const profileSelectorState = createFeatureSelector<Profile[]>('profile')

export const profileSelectorData = createSelector(
    profileSelectorState,
    (profile:Profile[]) => profile
)