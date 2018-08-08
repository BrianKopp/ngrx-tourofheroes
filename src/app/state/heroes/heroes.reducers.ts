import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { HeroesAction } from './heroes.actions';
import { Hero } from './../../models/hero';
import {
    SELECT_HERO,
    LOAD_HERO_SUCCESS,
    LOAD_HEROES_SUCCESS,
    ADD_HERO_SUCCESS,
    DELETE_HERO_SUCCESS,
    UPDATE_HERO_SUCCESS
} from './heroes.actions';

export interface State extends EntityState<Hero> {
    selectedHeroId: number;
}
export const adapter: EntityAdapter<Hero> = createEntityAdapter();
const initialState: State = adapter.getInitialState({
    selectedHeroId: null
});

export function reducer(state: State = initialState, action: HeroesAction) {
    switch(action.type) {
        case SELECT_HERO:
            return {...state, selectedHeroId: action.payload.id};
        case LOAD_HERO_SUCCESS:
            return adapter.addOne(action.payload, state);
        case LOAD_HEROES_SUCCESS:
            return adapter.addMany(action.payload, state);
        case ADD_HERO_SUCCESS:
            return adapter.addOne(action.payload, state);
        case DELETE_HERO_SUCCESS:
            return adapter.removeOne(action.payload.id, state);
        case UPDATE_HERO_SUCCESS:
            return adapter.updateOne({
                id: action.payload.id,
                changes: action.payload
            }, state);
        default:
            return state;
    }
}

export const getSelectedHeroId = (state: State) => state.selectedHeroId;
