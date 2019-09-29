import {balanceReducer} from '../balanceReducer';
import {BALANCE_OPERATION, balanceUpdateAction, BalanceUpdatePayload} from '../../actions/balanceActions';
import {Currency} from '../../domain/Currency';

const state = {
    [Currency.USD]: 200,
    [Currency.EUR]: 150,
    [Currency.GBP]: 35,
};

describe('Balance reducer', () => {
    it('Should return initial state on any other action', () => {
        expect(balanceReducer(state, {type: 'Some action', payload: undefined})).toEqual(state);
    });

    it('Should return new state on balance update action', () => {
        const payload: BalanceUpdatePayload = [
            {
                currency: Currency.USD,
                amount: 100,
                operation: BALANCE_OPERATION.SUBTRACT,
            },
            {
                currency: Currency.EUR,
                amount: 90,
                operation: BALANCE_OPERATION.ADD,
            }
        ];
        const action = balanceUpdateAction(payload);
        const newState = {
            [Currency.USD]: 100,
            [Currency.EUR]: 240,
            [Currency.GBP]: 35,
        };

        expect(balanceReducer(state, action)).toEqual(newState);
    });
});


