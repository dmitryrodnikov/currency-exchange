import {AnyAction, Reducer} from 'redux';
import {expectSaga, SagaType} from 'redux-saga-test-plan';
import {call} from 'redux-saga/effects';
import {API, CurrencyResponse} from '../../api/currencyApi';
import {Currency} from '../../domain/Currency';
import {currencyReducer, CurrencyState} from '../../reducers/currencyReducer';
import {currencySaga} from '../currencySaga';

describe('Currency saga', () => {
    it('Currency state should update after currency saga call', async () => {
        const saga = await runCurrencySaga();
        return expect(saga.storeState).toEqual(
            {
                [Currency.EUR]: 1,
                [Currency.USD]: 0.8,
                [Currency.GBP]: 0.7,
            }
        );
    });
});

const apiResponse: CurrencyResponse = {
    base: 'EUR',
    date: '2019-09-29',
    rates: {
        [Currency.EUR]: 1,
        [Currency.USD]: 0.8,
        [Currency.GBP]: 0.7,
    },
    success: true,
    timestamp: 1569782646,
};

function runCurrencySaga(): Promise<ExpectSaga> {
    return expectSaga(currencySaga as SagaType)
        .provide([
            [call(API.getLatestCurrencies), apiResponse],
        ])
        .withReducer(currencyReducer as Reducer<CurrencyState, AnyAction>)
        .silentRun();
}

interface ExpectSaga {
    storeState: CurrencyState;
}
