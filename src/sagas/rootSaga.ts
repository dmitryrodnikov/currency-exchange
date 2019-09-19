import {all, takeEvery, put, call, delay} from 'redux-saga/effects'
import {CurrencyExchangeActions, updateCurrenciesAction} from '../actions/currencyExchangeActions';
import {API, CurrencyResponse} from '../api/currencyApi';

const REQUEST_DELAY = 10 * 1000;

export function* rootSaga() {
    yield all([
        takeEvery(CurrencyExchangeActions.START_POLLING, fetchCurrencies)
    ]);
}

function* fetchCurrencies() {
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
