import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {CurrencyExchangeContainer} from './containers/CurrencyExchangeContainer';
import {PageLayout} from './components/PageLayout/PageLayout';

export const App = () => (
    <Provider store={store}>
        <PageLayout>
            <CurrencyExchangeContainer/>
        </PageLayout>
    </Provider>
);
