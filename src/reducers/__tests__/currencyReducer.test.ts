import {currencyReducer} from '../currencyReducer';
import {Currency} from '../../domain/Currency';
import {updateCurrenciesAction, UpdateCurrencyPayload} from '../../actions/currencyExchangeActions';

const state = {
    [Currency.USD]: 1,
    [Currency.EUR]: 0.8,
    [Currency.GBP]: 0.7,
};

describe('Currency reducer', () => {
    it('Should return initial state on any other action', () => {
        expect(currencyReducer(state, {type: 'Some action', payload: undefined})).toEqual(state);
    });

    it('Should return new state on currency update action', () => {
        const payload: UpdateCurrencyPayload = {
            currencies: {
                [Currency.USD]: 1,
                [Currency.EUR]: 0.85,
                [Currency.GBP]: 0.75,
            }
        };
        const action = updateCurrenciesAction(payload);
        const newState = {
            [Currency.USD]: 1,
            [Currency.EUR]: 0.85,
            [Currency.GBP]: 0.75,
        };

        expect(currencyReducer(state, action)).toEqual(newState);
    });
});


