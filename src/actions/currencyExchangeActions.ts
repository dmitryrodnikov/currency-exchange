import {createAction} from 'redux-actions';
import {Currency} from '../domain/Currency';

export const CurrencyExchangeActions = {
    START_POLLING: 'START_POLLING',
    UPDATE_CURRENCIES: 'UPDATE_CURRENCIES',
};

export const startPollingAction = createAction(CurrencyExchangeActions.START_POLLING);
export const updateCurrenciesAction = createAction<UpdateCurrencyPayload>(CurrencyExchangeActions.UPDATE_CURRENCIES);

export interface UpdateCurrencyPayload {
    currencies: Record<Currency, number>;
}
