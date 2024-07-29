import { Injectable } from "@angular/core";
import { ofType, Actions, createEffect } from "@ngrx/effects";
import { AuthService } from "../../../services/auth.service";
import { fetchUserAPI, fetchUserAPISuccess} from "./user.action";
import { map, switchMap, tap } from "rxjs";
import { Action } from "@ngrx/store";


@Injectable()
export class userEffects {
    constructor(private actions$: Actions<Action>, private userService: AuthService) { }

    userId: string | null = localStorage.getItem('userId')

    loadAllUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchUserAPI),
            switchMap(() => {
                return this.userService.fetchAllUsers()
                    .pipe(
                        map((data) => fetchUserAPISuccess({ allUser: Object.values(data) }))
                    )
            })
        )
    )

}