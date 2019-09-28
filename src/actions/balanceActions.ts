import {createAction} from 'redux-actions';
import {Currency} from '../domain/Currency';

export const BalanceActions = {
    UPDATE_BALANCE: 'UPDATE_BALANCE',
    UPDATE_CURRENCIES: 'UPDATE_CURRENCIES',
};

export const balanceUpdateAction = createAction<BalanceUpdatePayload>(BalanceActions.UPDATE_BALANCE);

export type BalanceUpdatePayload = BalanceUpdateParams[];

interface BalanceUpdateParams {
    amount: number
    currency: Currency;
    operation: BALANCE_OPERATION;
}

export enum BALANCE_OPERATION {
    ADD,
    SUBTRACT,
}
