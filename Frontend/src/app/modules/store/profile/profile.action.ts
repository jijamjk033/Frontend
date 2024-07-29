import { createAction, props } from "@ngrx/store";
import { Profile } from "../user";


export const fetchUserProfileAPI = createAction(
    '[Profile API] User Profile API'

)
export const fetchUserProfileAPISuccess = createAction(
    '[Profile API] User Profile API Success',
    props<{ profile: Profile[] }>()
)
