import React from 'react';
import {mount, render, shallow} from 'enzyme';
import {CurrencySelect} from './CurrencySelect';
import {Currency} from '../../domain/Currency';
import {spy} from 'sinon';

const CURRENCIES= [Currency.USD, Currency.GBP, Currency.EUR];

describe('CurrencySelect', () => {
    it('Shallow render snapshots are equal', () => {
        const wrapper = shallow(
            <CurrencySelect
                currencies={CURRENCIES}
                selected={Currency.USD}
                onItemClick={() => {}}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('Render snapshots are equal', () => {
        const wrapper = render(
            <CurrencySelect
                currencies={CURRENCIES}
                selected={Currency.USD}
                onItemClick={() => {}}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('Click handler called once with exact argument', () => {
        const clickHandler = spy();
        const wrapper = mount(
            <CurrencySelect
                currencies={CURRENCIES}
                selected={Currency.GBP}
                onItemClick={clickHandler}
            />
        );

        wrapper.find('div').at(1).simulate('click');

        expect(clickHandler.calledOnceWithExactly(Currency.USD)).toBe(true);
    });
});
