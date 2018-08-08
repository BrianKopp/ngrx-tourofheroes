import { ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";

import { routerReducer } from "@ngrx/router-store";
import { storeFreeze } from 'ngrx-store-freeze';
import { AppState } from "./app.interface";
import { environment } from "../../environments/environment.prod";

export const appReducer: ActionReducerMap<AppState> = {
    router: routerReducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function(state: AppState, action: any): AppState {
        console.log("state", state);
        console.log("action", action);
        return reducer(state, action);
    }
}

export const appMetaReducers: MetaReducer<AppState>[] =
    !environment.production ? [logger, storeFreeze] : [];