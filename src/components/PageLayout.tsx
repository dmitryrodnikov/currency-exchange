import * as React from 'react';
import styled from 'styled-components';

const StyledPageLayout = styled.div`
    padding: 40px;
    max-width: 600px;
    margin: 0 auto;
`;

export const PageLayout: React.FunctionComponent = ({children}) => {
    return (
        <StyledPageLayout>{children}</StyledPageLayout>
    );
};
