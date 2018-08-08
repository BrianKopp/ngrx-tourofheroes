import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { appMetaReducers, appReducer } from './app.reducer';
import { CustomSerializer } from './shared/utils';
import { AppEffects } from './app.effects';
import * as fromHeroes from './heroes/index';
import { environment } from '../../environments/environment';
import { HeroesEffects } from './heroes/heroes.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(appReducer, {
      metaReducers: appMetaReducers
    }),
    StoreModule.forFeature('heroes', fromHeroes.reducers),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([
      AppEffects
    ]),
    EffectsModule.forFeature([
      HeroesEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  declarations: []
})
export class StateModule {
  constructor(@Optional() @SkipSelf() parentModule: StateModule) {
    if (parentModule) {
      throw new Error('StateModule is already loaded. Import it in the AppModule only');
    }
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StateModule,
      providers: [
        {
          provide: RouterStateSerializer,
          useClass: CustomSerializer
        }
      ]
    }
  }
}
