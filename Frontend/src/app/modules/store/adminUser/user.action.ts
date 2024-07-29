import { createAction, props } from "@ngrx/store";
import { User} from "../user";


export const fetchUserAPI = createAction(
    "[User API] Fetch User API"
)

export const fetchUserAPISuccess = createAction(
    "[User API] Fetch User API Success",
    props<{ allUser: User[] }>()
)

