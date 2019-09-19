import * as React from 'react';
import {ChangeEvent} from 'react';
import styled from 'styled-components';
import {COLORS, FONT_SIZE} from '../constants/Theme';

interface InputProps {
    value: string;
    onChange?: InputChangeHandler;
}

export type InputChangeHandler = (value: number) => void;

const StyledInput = styled.input`
    border: none;
    border-radius: 8px;
    padding: 0 8px;
    box-sizing: border-box;
    text-align: right;
    outline: none;
    height: 36px;
    width: 100%;
    color: ${COLORS.black};
    font-size: ${FONT_SIZE.l};
    font-weight: bold;
    transition: 300ms background-color;
    
    /* Remove input controls in Webkit browsers */
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    /* Remove input controls in Firefox */
    -moz-appearance:textfield;
    
    &:hover,
    &:focus {
        background-color: ${COLORS.green}10;
    }
`;

export class Input extends React.PureComponent<InputProps> {
    public render() {
        return (
            <StyledInput
                type='number'
                value={this.props.value}
                onChange={this.onChangeHandler}
            />
        );
    }

    private onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const {onChange} = this.props;
        if (onChange) {
            onChange(Number(e.target.value));
        }
    }
}
