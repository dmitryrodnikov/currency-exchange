import {Currency} from '../domain/Currency';
import {Action} from 'redux-actions';
import {BalanceActions, BalanceUpdatePayload, BALANCE_OPERATION} from '../actions/balanceActions';

export type BalanceState = Record<Currency, number>;

const initialState = {
    [Currency.USD]: 200,
    [Currency.EUR]: 150,
    [Currency.GBP]: 35,
};

export function balanceReducer(
    state: BalanceState = initialState,
    action: Action<any>,
): BalanceState {
    switch (action.type) {
        case BalanceActions.UPDATE_BALANCE:
            return updateBalance(state, action);
        default:
            return state;
    }
}

function calculateValue(currentAmount: number, amount: number, operation: BALANCE_OPERATION): number {
    switch (operation) {
        case BALANCE_OPERATION.ADD:
            return currentAmount + amount;
        case BALANCE_OPERATION.SUBTRACT:
            return currentAmount - amount;
    }
}

function updateBalance(
    state: BalanceState,
    action: Action<BalanceUpdatePayload>,
): BalanceState {
    const newState = {...state};
    action.payload.forEach(operation => {
        const targetCurrency = operation.currency;
        const currentAmount = newState[targetCurrency];
        newState[targetCurrency] = calculateValue(currentAmount, operation.amount, operation.operation);
    });
    return newState;
}
