import {combineReducers} from 'redux';
import {currencyReducer, CurrencyState} from './currencyReducer';

export interface rootState {
    currency: CurrencyState
}

export const rootReducer = combineReducers<rootState>({
    currency: currencyReducer,
});
