import * as React from 'react';
import styled from 'styled-components';
import {Currency} from '../../domain/Currency';
import {Button, ButtonClickHandler} from '../Button/Button';

const Wrapper = styled.div`
    display: flex;
    margin: 0 -2px;
`;

interface CurrencySelectorProps {
    currencies: Currency[];
    selected: Currency;
    onItemClick: ButtonClickHandler<Currency>;
}

export function CurrencySelect(props: CurrencySelectorProps) {
    return (
        <Wrapper>
            {
                props.currencies.map(currency => {
                    return (
                        <Button
                            value={currency}
                            key={currency}
                            active={currency === props.selected}
                            onClick={props.onItemClick}
                        >
                            {currency}
                        </Button>
                    );
                })
            }
        </Wrapper>
    );
}
