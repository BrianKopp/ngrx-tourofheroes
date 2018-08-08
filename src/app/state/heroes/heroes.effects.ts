import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Action } from '@ngrx/store';

import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HeroService } from './../../services/hero.service';
import { 
    AddHero
    , ADD_HERO
    , AddHeroSuccess
    , DeleteHero
    , DELETE_HERO
    , DeleteHeroSuccess
    , LoadHero
    , LoadHeroes
    , UpdateHero
    , LOAD_HERO
    , LOAD_HEROES
    , UPDATE_HERO
    , LoadHeroSuccess
    , LoadHeroesSuccess
    , UpdateHeroSuccess
} from './heroes.actions';

@Injectable()
export class HeroesEffects {
    @Effect()
    addHero: Observable<Action> = this.actions.ofType<AddHero>(ADD_HERO)
        .pipe(
            map(action => action.payload),
            switchMap(hero => this.heroesService.addHero(hero)),
            map(hero => new AddHeroSuccess(hero))
        );
    @Effect()
    deleteHero: Observable<Action> = this.actions.ofType<DeleteHero>(DELETE_HERO)
        .pipe(
            map(action => action.payload),
            switchMap(hero => this.heroesService.deleteHero(hero)),
            map(hero => new DeleteHeroSuccess(hero))
        );
    @Effect()
    loadHero: Observable<Action> = this.actions.ofType<LoadHero>(LOAD_HERO)
        .pipe(
            map(action => action.payload),
            switchMap(payload => this.heroesService.getHero(payload.id)),
            map(hero => new LoadHeroSuccess(hero))
        );

    @Effect()
    loadHeroes: Observable<Action> = this.actions.ofType<LoadHeroes>(LOAD_HEROES)
        .pipe(
            switchMap(() => this.heroesService.getHeroes()),
            map(heroes => new LoadHeroesSuccess(heroes))
        );
        
    @Effect()
    updateHeroes: Observable<Action> = this.actions.ofType<UpdateHero>(UPDATE_HERO)
        .pipe(
            map(action => action.payload),
            switchMap(hero => this.heroesService.updateHero(hero)),
            map(hero => new UpdateHeroSuccess(hero))
        );
            
        constructor(private actions: Actions, private heroesService: HeroService){}
}