import {Currencies, CurrencyRates} from '../domain/Currency';

const ACCESS_KEY = process.env.REACT_APP_FIXER_ACCESS_KEY;
const CURRENCY_PROVIDER_PATH = 'http://data.fixer.io/api/';
const CURRENCY_PARAMS = Currencies.join(',');

export const API = {
    getLatestCurrencies,
};

async function getLatestCurrencies(): Promise<CurrencyResponse> {
    const url = `${CURRENCY_PROVIDER_PATH}latest?access_key=${ACCESS_KEY}&symbols=${CURRENCY_PARAMS}`;
    const response = await fetch(url);
    return response.json();
}

export interface CurrencyResponse {
    base: string;
    date: string;
    rates: CurrencyRates;
    success: boolean;
    timestamp: number;
}
