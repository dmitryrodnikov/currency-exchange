import * as React from 'react';
import styled from 'styled-components'
import {COLORS} from '../../constants/Theme';

const StyledButton = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    color: #fff;
    background: ${(props: StyledButtonProps) => props.disabled ? COLORS.greyDark : COLORS.blue};
    border-radius: 8px;
    cursor: ${(props: StyledButtonProps) => props.disabled ? 'not-allowed' : 'pointer'};
    user-select: none;
    transition: background 200ms;
    
    &:active {
        background: ${(props: StyledButtonProps) => props.disabled ? COLORS.greyDark : COLORS.blueLight};
   }
`;

export class ButtonAction extends React.PureComponent<ButtonActionProps> {
    public render(){
        const {text, disabled} = this.props;
        return (
            <StyledButton
                disabled={disabled}
                onClick={this.handleClick}
            >
                {text}
            </StyledButton>
        );
    }

    private handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!this.props.disabled) {
            this.props.onClick(e);
        }
    }
}

interface ButtonActionProps extends StyledButtonProps{
    text: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

interface StyledButtonProps {
    disabled?: boolean;
}
