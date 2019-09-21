import React from 'react';
import {shallow, render} from 'enzyme';
import {Output} from './Output';

const VALUE= 'Test';

describe('Output', () => {
    it('Shallow render snapshots are equal', () => {
        const wrapper = shallow(
            <Output text={VALUE}/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('Render snapshots are equal', () => {
        const wrapper = render(
            <Output text={VALUE}/>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
