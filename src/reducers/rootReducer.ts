import {combineReducers} from 'redux';
import {currencyReducer, CurrencyState} from './currencyReducer';
import {balanceReducer, BalanceState} from './balanceReducer';

export interface rootState {
    balance: BalanceState,
    currency: CurrencyState
}

export const rootReducer = combineReducers<rootState>({

    balance: balanceReducer,
    currency: currencyReducer,
});
