import {Currency} from '../domain/Currency';
import {Action} from 'redux-actions';
import {CurrencyExchangeActions, UpdateCurrencyPayload} from '../actions/currencyExchangeActions';

export type CurrencyState = Record<Currency, number>;

const initialState = {
    [Currency.USD]: 0,
    [Currency.EUR]: 0,
    [Currency.GBP]: 0,
};

export function currencyReducer(
    state: CurrencyState = initialState,
    action: Action<any>
): CurrencyState {
    switch (action.type) {
        case CurrencyExchangeActions.UPDATE_CURRENCIES:
            return updateCurrencies(state, action);
        default:
            return state;
    }
}

function updateCurrencies(
    state: CurrencyState,
    action: Action<UpdateCurrencyPayload>
): CurrencyState {
    return action.payload.currencies;
}
