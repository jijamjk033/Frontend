import { Injectable } from "@angular/core";
import { ofType, Actions, createEffect } from "@ngrx/effects";
import { AuthService } from "../../../services/auth.service";
import {  fetchUserProfileAPI, fetchUserProfileAPISuccess } from "./profile.action";
import { map, switchMap, tap } from "rxjs";
import { Action } from "@ngrx/store";


@Injectable()
export class profileEffects {
    constructor(private actions$: Actions<Action>, private userService: AuthService) { }

    userId: string | null = localStorage.getItem('userId')


    loadUserProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchUserProfileAPI),
            switchMap(() => {
                return this.userService.fetchUserProfile(this.userId)
                    .pipe(
                        map((data) => fetchUserProfileAPISuccess({ profile: data }))
                    )
            })
        )
    )

}