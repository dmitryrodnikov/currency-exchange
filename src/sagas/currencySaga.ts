import {API, CurrencyResponse} from '../api/currencyApi';
import {takeEvery, put, call, delay} from 'redux-saga/effects'
import {CurrencyExchangeActions, updateCurrenciesAction} from '../actions/currencyExchangeActions';

const REQUEST_DELAY = 10 * 1000;

export function* currencySaga() {
    while (true) {
        try {
            const {rates}: CurrencyResponse = yield call(API.getLatestCurrencies);
            yield put(updateCurrenciesAction({currencies: rates}));
            yield delay(REQUEST_DELAY);
        } catch (e) {
            yield delay(REQUEST_DELAY);
        }
    }
}

export function* watchCurrencySaga() {
    yield takeEvery(CurrencyExchangeActions.START_POLLING, currencySaga);
}
