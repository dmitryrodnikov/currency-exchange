import {Currency} from '../domain/Currency';

export type BalanceState = Record<Currency, number>;

const initialState = {
    [Currency.USD]: 200,
    [Currency.EUR]: 150,
    [Currency.GBP]: 35,
};

export function balanceReducer(
    state: BalanceState = initialState,
): BalanceState {
    return state;
}

