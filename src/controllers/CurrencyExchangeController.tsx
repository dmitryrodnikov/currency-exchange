import * as React from 'react';
import {CurrencyExchange} from '../components/CurrencyExchange/CurrencyExchange';
import {Currency, CurrencyRates} from '../domain/Currency';
import {BalanceUpdatePayload, BALANCE_OPERATION} from '../actions/balanceActions';

export class CurrencyExchangeController extends React.Component<CurrencyExchangeProps, CurrencyExchangeState> {
    private static formatAmount(value: number): string {
        return String(Math.floor(value * 100) / 100);
    }

    public state: CurrencyExchangeState = {
        fromAmount: 0,
        fromCurrency: Currency.USD,
        toAmount: 0,
        toCurrency: Currency.EUR,
    };

    public componentDidMount(): void {
        this.props.startPolling();
    }

    public render(): React.ReactElement {
        const {balance} = this.props;
        const {formatAmount} = CurrencyExchangeController;
        const {fromCurrency, toCurrency, fromAmount, toAmount} = this.state;
        const fromBalance = formatAmount(balance[fromCurrency]);
        const toBalance = formatAmount(balance[toCurrency]);
        const toExchangeRate = this.getExchangeRate(toCurrency, fromCurrency);
        const toAmountFormatted = formatAmount(toAmount);
        const toExchangeRateFormatted = formatAmount(toExchangeRate);
        const fromAmountFormatted = String(fromAmount);

        return (
            <CurrencyExchange
                fromBalance={fromBalance}
                fromCurrency={fromCurrency}
                fromAmount={fromAmountFormatted}
                toBalance={toBalance}
                toCurrency={toCurrency}
                toAmount={toAmountFormatted}
                toExchangeRate={toExchangeRateFormatted}
                currencyList={this.getCurrencyList()}
                onChangeAmount={this.onChangeAmount}
                onChangeCurrencyFrom={this.changeCurrencyFrom}
                onChangeCurrencyTo={this.changeCurrencyTo}
                onClickExchangeButton={this.onClickExchange}
                isButtonDisabled={this.isButtonDisabled()}
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
        this.setState({
            fromCurrency: currency,
            toAmount: this.calculateToAmount(currency, this.state.toCurrency, this.state.fromAmount),
        });
    };

    private changeCurrencyTo = (currency: Currency) => {
        this.setState({
            toCurrency: currency,
            toAmount: this.calculateToAmount(this.state.fromCurrency, currency, this.state.fromAmount),
        });
    };

    private getCurrencyList() {
        return Object.keys(this.props.currencyRates) as Currency[];
    }

    private onChangeAmount = (fromAmount: number) => {
        this.setState({
            fromAmount,
            toAmount: this.calculateToAmount(this.state.fromCurrency, this.state.toCurrency, fromAmount),
        });
    };

    private calculateToAmount(
        fromCurrency: Currency,
        toCurrency: Currency,
        fromAmount: number
    ) {
        const fromExchangeRate = this.getExchangeRate(fromCurrency, toCurrency);
        return fromExchangeRate * fromAmount;
    }

    private onClickExchange = () => {
        this.props.exchange([
            {
                currency: this.state.fromCurrency,
                amount: this.state.fromAmount,
                operation: BALANCE_OPERATION.SUBTRACT,
            },
            {
                currency: this.state.toCurrency,
                amount: this.state.toAmount,
                operation: BALANCE_OPERATION.ADD,
            }
        ]);
        // Reset after exchange
        this.setState({
            toAmount: 0,
            fromAmount: 0,
        });
    };

    private isButtonDisabled(): boolean {
        const {toCurrency, fromCurrency, fromAmount} = this.state;
        const {balance} = this.props;
        const fromBalance = balance[fromCurrency];
        return toCurrency === fromCurrency || fromAmount === 0 || fromBalance < fromAmount;
    }
}

interface CurrencyExchangeState {
    fromAmount: number,
    fromCurrency: Currency,
    toAmount: number,
    toCurrency: Currency,
}

type CurrencyExchangeProps = CurrencyExchangeStateProps & CurrencyExchangeDispatchProps;

export interface CurrencyExchangeStateProps {
    currencyRates: CurrencyRates;
    balance: Record<Currency, number>;
}

export interface CurrencyExchangeDispatchProps {
    startPolling: Function;
    exchange: (payload: BalanceUpdatePayload) => void;
}
