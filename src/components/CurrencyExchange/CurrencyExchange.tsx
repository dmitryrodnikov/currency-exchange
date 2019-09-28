import * as React from 'react';
import styled from 'styled-components';
import {Input, InputChangeHandler} from '../Input/Input';
import {CurrencySelect} from '../CurrencySelect/CurrencySelect';
import {Currency, CurrencySymbol} from '../../domain/Currency';
import {ButtonClickHandler} from '../Button/Button';
import {Output} from '../Output/Output';

interface CurrencyExchangeProps {
    fromBalance: string;
    fromCurrency: Currency;
    fromAmount: string;
    toBalance: string;
    toCurrency: Currency;
    toAmount: string;
    toExchangeRate: string;
    onChangeAmount: InputChangeHandler,
    onChangeCurrencyFrom: ButtonClickHandler<Currency>;
    onChangeCurrencyTo: ButtonClickHandler<Currency>;
    onClickExchangeButton: VoidFunction;
    currencyList: Currency[]
}

const StyledCurrencyExchange = styled.div`
    display: flex;
    flex-direction: column;
    padding: 18px 12px;
    border-radius: 12px;
    box-shadow: 0 2px 4px #00000020, 0 4px 12px #00000010;
`;

const ExchangeBlockWrapper = styled.div`
    padding: 16px 12px;
    overflow: hidden;
    
    &:first-child {
        border-bottom: 2px solid #00000010;
    }
`;

const InfoBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    color: #00000080;
    font-size: 14px;
    margin: 6px 8px 0 0;
`;

const ExchangeBlock = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;
`;

const CurrencyAmount = styled.div`
    margin-left: 20px;
    width: 100%;
    overflow: hidden;
`;

const ExchangeButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const ExchangeButton = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    color: #fff;
    background: #1200ff;
    border-radius: 8px;
    cursor: pointer;
`;

export function CurrencyExchange(
    {
        fromBalance,
        fromCurrency,
        fromAmount,
        toBalance,
        toCurrency,
        toAmount,
        toExchangeRate,
        currencyList,
        onChangeAmount,
        onChangeCurrencyFrom,
        onChangeCurrencyTo,
        onClickExchangeButton,
    }: CurrencyExchangeProps
) {
    const toExchangeRateFormatted = `${CurrencySymbol[toCurrency]}1 = ${CurrencySymbol[fromCurrency]}${toExchangeRate}`;
    const getFormattedBalance = (amount: string, currency: Currency) => `You have ${CurrencySymbol[currency]}${amount}`;
    const toBalanceFormatted = getFormattedBalance(toBalance, toCurrency);
    const fromBalanceFormatted = getFormattedBalance(fromBalance, fromCurrency);
    return (
        <StyledCurrencyExchange>
            <ExchangeBlockWrapper>
                <ExchangeBlock>
                    <CurrencySelect
                        selected={fromCurrency}
                        currencies={currencyList}
                        onItemClick={onChangeCurrencyFrom}
                    />
                    <CurrencyAmount>
                        <Input
                            value={fromAmount}
                            onChange={onChangeAmount}
                        />
                    </CurrencyAmount>
                </ExchangeBlock>
                <InfoBlock>
                    <div>{fromBalanceFormatted}</div>
                </InfoBlock>
            </ExchangeBlockWrapper>
            <ExchangeBlockWrapper>
                <ExchangeBlock>
                    <CurrencySelect
                        selected={toCurrency}
                        currencies={currencyList}
                        onItemClick={onChangeCurrencyTo}
                    />
                    <CurrencyAmount>
                        <Output text={toAmount}/>
                    </CurrencyAmount>
                </ExchangeBlock>
                <InfoBlock>
                    <div>{toBalanceFormatted}</div>
                    <div>{toExchangeRateFormatted}</div>
                </InfoBlock>
            </ExchangeBlockWrapper>
            <ExchangeButtonWrapper>
                <ExchangeButton onClick={onClickExchangeButton}>
                    Exchange
                </ExchangeButton>
            </ExchangeButtonWrapper>
        </StyledCurrencyExchange>
    );
}
