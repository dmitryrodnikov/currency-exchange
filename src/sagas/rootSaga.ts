import {all} from 'redux-saga/effects'
import {watchCurrencySaga} from './currencySaga';

export function* rootSaga() {
    yield all([
        watchCurrencySaga(),
    ]);
}
