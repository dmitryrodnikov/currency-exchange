import * as React from 'react';
import {CurrencyExchange} from '../components/CurrencyExchange/CurrencyExchange';
import {Currency} from '../domain/Currency';

export class CurrencyExchangeController extends React.Component<CurrencyConverterProps, CurrencyConverterState> {
    public state: CurrencyConverterState = {
        fromAmount: 0,
        fromCurrency: Currency.USD,
        toAmount: 0,
        toCurrency: Currency.EUR,
    };

    public componentDidMount(): void {
        this.props.startPolling();
    }

    public render(): React.ReactElement {
        const {fromCurrency, toCurrency, fromAmount} = this.state;
        const fromExchangeRate = this.getExchangeRate(fromCurrency, toCurrency);
        const toExchangeRate = this.getExchangeRate(toCurrency, fromCurrency);
        const toAmount = fromExchangeRate * fromAmount;
        const toAmountFormatted = String(Math.floor(toAmount * 100) / 100);
        const toExchangeRateFormatted = Math.floor(toExchangeRate * 100) / 100;
        const fromAmountFormatted = String(fromAmount);

        return (
            <CurrencyExchange
                fromCurrency={fromCurrency}
                fromAmount={fromAmountFormatted}
                toCurrency={toCurrency}
                toAmount={toAmountFormatted}
                toExchangeRate={toExchangeRateFormatted}
                currencyList={this.getCurrencyList()}
                onChangeAmount={this.onChangeAmount}
                onChangeCurrencyFrom={this.changeCurrencyFrom}
                onChangeCurrencyTo={this.changeCurrencyTo}
            />
        );
    }

    private getExchangeRate(
        relationOf: Currency,
        relationTo: Currency,
    ): number {
        const {currencyRates} = this.props;
        const rateOf = currencyRates[relationTo];
        const rateTo = currencyRates[relationOf];
        if (rateTo === 0) {
            return 0;
        }
        return rateOf / rateTo;
    }

    private changeCurrencyFrom = (currency: Currency) => {
        this.setState({fromCurrency: currency});
    };

    private changeCurrencyTo = (currency: Currency) => {
        this.setState({toCurrency: currency});
    };

    private getCurrencyList() {
        return Object.keys(this.props.currencyRates) as Currency[];
    }

    private onChangeAmount = (value: number) => {
        this.setState({fromAmount: value});
    };
}

interface CurrencyConverterState {
    fromAmount: number,
    fromCurrency: Currency,
    toAmount: number,
    toCurrency: Currency,
}

type CurrencyConverterProps = CurrencyConverterStateProps & CurrencyConverterDispatchProps;

export interface CurrencyConverterStateProps {
    currencyRates: Record<Currency, number>;
}

export interface CurrencyConverterDispatchProps {
    startPolling: Function;
}
