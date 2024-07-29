import { createReducer } from '@ngrx/store';
import { provideState, provideStore } from '@ngrx/store';
import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { profileEffects} from './modules/store/profile/profile.effects';
import { _profileReducer} from './modules/store/profile/profile.reducer';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { _userReducer } from './modules/store/adminUser/user.reducer';
import { userEffects } from './modules/store/adminUser/user.effects';




export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(),provideEffects(profileEffects),provideEffects(userEffects),
    provideStore(),provideState({name:'profile',reducer: _profileReducer}),provideState({name:'users',reducer: _userReducer}),provideToastr(),provideAnimations()]
};
