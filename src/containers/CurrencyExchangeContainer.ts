import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {startPollingAction} from '../actions/currencyExchangeActions';
import {
    CurrencyExchangeController,
    CurrencyExchangeDispatchProps,
    CurrencyExchangeStateProps
} from '../controllers/CurrencyExchangeController';
import {rootState} from '../reducers/rootReducer';

const mapStateToProps = ({currency, balance}: rootState): CurrencyExchangeStateProps => {
    return {
        currencyRates: currency,
        balance,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): CurrencyExchangeDispatchProps => {
    return {
        startPolling: () => dispatch(startPollingAction())
    };
};

export const CurrencyExchangeContainer = connect(mapStateToProps, mapDispatchToProps)(CurrencyExchangeController);
