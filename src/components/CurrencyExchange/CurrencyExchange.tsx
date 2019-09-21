import * as React from 'react';
import styled from 'styled-components';
import {Input, InputChangeHandler} from '../Input/Input';
import {CurrencySelect} from '../CurrencySelect/CurrencySelect';
import {Currency} from '../../domain/Currency';
import {ButtonClickHandler} from '../Button/Button';
import {Output} from '../Output/Output';

interface CurrencyExchangeProps {
    fromCurrency: Currency;
    toCurrency: Currency;
    fromAmount: string;
    toAmount: string;
    onChangeAmount: InputChangeHandler,
    onChangeCurrencyFrom: ButtonClickHandler<Currency>;
    onChangeCurrencyTo: ButtonClickHandler<Currency>;
    currencyList: Currency[]
}

const StyledCurrencyExchange = styled.div`
    display: flex;
    flex-direction: column;
    padding: 18px 12px;
    border-radius: 12px;
    box-shadow: 0 2px 4px #00000020, 0 4px 12px #00000010;
`;

const ExchangeBlock = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 2px solid #00000010;
    padding: 16px 12px;
    overflow: hidden;
    
    &:last-child {
        border-bottom: none;
    }
`;

const CurrencyAmount = styled.div`
    margin-left: 20px;
    width: 100%;
    overflow: hidden;
`;

export function CurrencyExchange(
    {
        fromAmount,
        toAmount,
        onChangeAmount,
        onChangeCurrencyFrom,
        onChangeCurrencyTo,
        currencyList,
        fromCurrency,
        toCurrency,
    }: CurrencyExchangeProps
) {
    return (
        <StyledCurrencyExchange>
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
        </StyledCurrencyExchange>
    );
}
