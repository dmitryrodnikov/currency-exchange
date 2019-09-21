import * as React from 'react';
import styled from 'styled-components';
import {COLORS} from '../../constants/Theme';

function getColorSelector(activeColor: string, inactiveColor: string) {
    return (props: StyledButtonProps) => props.active ? activeColor : inactiveColor;
}

const StyledButton = styled.div`
    padding: 6px 10px;
    margin: 0 2px;
    border-radius: 6px;
    cursor: pointer;
    background: ${getColorSelector(COLORS.green, 'transparent')}
    color: ${getColorSelector(COLORS.white, 'inherit')}
    
    &:hover {
        background-color: ${getColorSelector(COLORS.green, COLORS.grey)};
    }
`;

export class Button<VALUE> extends React.PureComponent<ButtonProps<VALUE>> {
    public render () {
        const {children, active} = this.props;
        return (
            <StyledButton
                active={active}
                onClick={this.clickHandler}
            >
                {children}
            </StyledButton>
        )
    }

    private clickHandler = () => {
        this.props.onClick(this.props.value);
    }
}

export type ButtonClickHandler<VALUE> = (value: VALUE) => void;

interface ButtonProps<VALUE> extends StyledButtonProps {
    value: VALUE;
    active: boolean;
    children: string;
    onClick: ButtonClickHandler<VALUE>;
}

interface StyledButtonProps {
    active: boolean
}

