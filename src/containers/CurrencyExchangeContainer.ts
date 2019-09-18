import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {startPollingAction} from '../actions/currencyExchangeActions';
import {
    CurrencyExchangeController,
    CurrencyConverterDispatchProps,
    CurrencyConverterStateProps
} from '../components/CurrencyExchangeController';
import {rootState} from '../reducers/rootReducer';
import {Currency} from '../domain/Currency';

const mapStateToProps = ({currency}: rootState): CurrencyConverterStateProps => {
    return {
        currencyRates: {
            [Currency.USD]: currency[Currency.USD],
            [Currency.EUR]: currency[Currency.EUR],
            [Currency.GBP]: currency[Currency.GBP],
        }
    };
};

const mapDispatchToProps = (dispatch: Dispatch): CurrencyConverterDispatchProps => {
    return {
        startPolling: () => dispatch(startPollingAction())
    };
};

export const CurrencyExchangeContainer = connect(mapStateToProps, mapDispatchToProps)(CurrencyExchangeController);
