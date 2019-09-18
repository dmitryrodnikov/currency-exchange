import * as React from 'react';
import styled from 'styled-components';
import {FONT_SIZE} from '../constants/Theme';

const StyledOutput = styled.div`
    font-size: ${FONT_SIZE.l};
    font-weight: bold;
    text-align: right;
    padding: 0 8px;
`;

export const Output: React.FunctionComponent<OutputProps> = ({text}) => {
    return (
        <StyledOutput>{text}</StyledOutput>
    );
};

interface OutputProps {
    text: string;
}
