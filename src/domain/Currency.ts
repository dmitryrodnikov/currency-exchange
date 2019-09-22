export enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
}

export type CurrencyRates = Record<Currency, number>;

export const CurrencySymbol = {
    [Currency.USD]: '\u0024',
    [Currency.EUR]: '\u20AC',
    [Currency.GBP]: '\u00A3'
};

export const Currencies = Object.keys(Currency);
