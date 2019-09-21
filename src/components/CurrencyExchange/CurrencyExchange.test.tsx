import React from 'react';
import {render, shallow} from 'enzyme';
import {CurrencyExchange} from './CurrencyExchange';
import {Currency} from '../../domain/Currency';

const CURRENCY_LIST= [Currency.USD, Currency.GBP, Currency.EUR];

describe('CurrencyExchange', () => {
    it('Shallow render snapshots are equal', () => {
        const wrapper = shallow(
            <CurrencyExchange
                fromCurrency={Currency.USD}
                toCurrency={Currency.EUR}
                fromAmount={String(100)}
                toAmount={String(80)}
                onChangeAmount={() => {}}
                currencyList={CURRENCY_LIST}
                onChangeCurrencyFrom={() => {}}
                onChangeCurrencyTo={() => {}}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('Render snapshots are equal', () => {
        const wrapper = render(
            <CurrencyExchange
                fromCurrency={Currency.USD}
                toCurrency={Currency.EUR}
                fromAmount={String(100)}
                toAmount={String(80)}
                onChangeAmount={() => {}}
                currencyList={CURRENCY_LIST}
                onChangeCurrencyFrom={() => {}}
                onChangeCurrencyTo={() => {}}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});
