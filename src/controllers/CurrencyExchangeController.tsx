import * as React from 'react';
import {CurrencyExchange} from '../components/CurrencyExchange/CurrencyExchange';
import {Currency} from '../domain/Currency';

export class CurrencyExchangeController extends React.Component<CurrencyConverterProps, CurrencyConverterState> {
    public static convertCurrency(
        fromCurrency: Currency,
        toCurrency: Currency,
        amount: number,
        currencyRates: Record<Currency, number>,
    ) {
        const toCurrencyRate = currencyRates[toCurrency];
        const fromCurrencyRate = currencyRates[fromCurrency];
        if (fromCurrencyRate === 0) {
            return 0;
        }
        return Math.floor((toCurrencyRate / fromCurrencyRate) * amount * 100) / 100;
    }

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
        const {currencyRates} = this.props;
        const outputAmount = CurrencyExchangeController.convertCurrency(
            fromCurrency,
            toCurrency,
            fromAmount,
            currencyRates
        );

        return (
            <CurrencyExchange
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                fromAmount={String(fromAmount)}
                toAmount={String(outputAmount)}
                onChangeAmount={this.onChangeAmount}
                currencyList={this.getCurrencyList()}
                onChangeCurrencyFrom={this.changeCurrencyFrom}
                onChangeCurrencyTo={this.changeCurrencyTo}
            />
        );
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
        if (value < 0) {
            return;
        }
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
