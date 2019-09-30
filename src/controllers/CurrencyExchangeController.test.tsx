import * as React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import {SinonSpy, spy} from 'sinon';
import {CurrencyExchangeController} from './CurrencyExchangeController';
import {Currency, CurrencyRates} from '../domain/Currency';
import {BALANCE_OPERATION} from '../actions/balanceActions';

const CURRENCY_RATES: CurrencyRates = {
    [Currency.USD]: 1,
    [Currency.EUR]: 0.9,
    [Currency.GBP]: 0.8,
};

const BALANCE = {
    [Currency.USD]: 100,
    [Currency.EUR]: 200,
    [Currency.GBP]: 300,
};

describe('CurrencyExchangeController', () => {
    let wrapper: ReactWrapper;
    let startPollingHandler: SinonSpy;
    let exchangeHandler: SinonSpy;

    beforeEach(() => {
        startPollingHandler = spy();
        exchangeHandler = spy();
        wrapper = mount(
            <CurrencyExchangeController
                currencyRates={CURRENCY_RATES}
                balance={BALANCE}
                startPolling={startPollingHandler}
                exchange={exchangeHandler}
            />
        );
    });

    it('Currency polling callback fired once after render', () => {
        expect(startPollingHandler.calledOnce).toBe(true);
    });

    it('Correct output after input change', () => {
        const input = wrapper.find('input');

        changeInputValue(input, '100');
        const output = wrapper.find('Output div');
        expect(output.contains('90')).toBe(true);
    });

    it('Correct output after input and currency change', () => {
        const input = wrapper.find('input');
        const gbpButton = getCurrencyChangeButton(wrapper, Currency.GBP);

        gbpButton.simulate('click');
        changeInputValue(input, '100');
        const output = wrapper.find('Output div');
        expect(output.contains('112.5')).toBe(true);
    });

    it('Exchange button enables on input change', () => {
        const input = wrapper.find('input');
        changeInputValue(input, '100');
        const exchangeButton = wrapper.find('ButtonAction div');
        expect(exchangeButton.prop('disabled')).toBe(false);
    });

    it('Exchange button disables if input value bigger than balance', () => {
        const input = wrapper.find('input');
        changeInputValue(input, '150');
        const exchangeButton = wrapper.find('ButtonAction div');
        expect(exchangeButton.prop('disabled')).toBe(true);
    });

    it('Exchange callback fires once on click with exact arguments', () => {
        const input = wrapper.find('input');
        changeInputValue(input, '100');
        const exchangeButton = wrapper.find('ButtonAction div');
        exchangeButton.simulate('click');
        const payload = [
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
        expect(exchangeHandler.calledOnceWithExactly(payload)).toBe(true);
    });

    it('Exchange callback doesn\'t fires if same currency selected', () => {
        const input = wrapper.find('input');
        changeInputValue(input, '100');
        const eurButton = getCurrencyChangeButton(wrapper, Currency.EUR);
        eurButton.simulate('click');
        const exchangeButton = wrapper.find('ButtonAction div');
        exchangeButton.simulate('click');
        expect(exchangeButton.prop('disabled')).toBe(true);
        expect(exchangeHandler.notCalled).toBe(true);
    });

    it('Exchange callback doesn\'t fires if value is 0', () => {
        const input = wrapper.find('input');
        changeInputValue(input, '0');
        const exchangeButton = wrapper.find('ButtonAction div');
        exchangeButton.simulate('click');
        expect(exchangeButton.prop('disabled')).toBe(true);
        expect(exchangeHandler.notCalled).toBe(true);
    });
});

function changeInputValue(input: ReactWrapper, value: string) {
    // NumberFormat focus callback workaround:
    // https://github.com/s-yadav/react-number-format/issues/269#issuecomment-468424689
    input.simulate('change', { target: { value, focus: () => {}}});
}

function getCurrencyChangeButton(wrapper: ReactWrapper, currency: Currency) {
    return wrapper.findWhere((w) => w.prop('value') === currency).first().find('div');
}
