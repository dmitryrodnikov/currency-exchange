import React from 'react';
import {shallow, render} from 'enzyme';
import {Input} from './Input';

const INPUT_VALUE= 'Test';

describe('Input', () => {
    it('Shallow render snapshots are equal', () => {
        const wrapper = shallow(
            <Input value={INPUT_VALUE}/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('Render snapshots are equal', () => {
        const wrapper = render(
            <Input value={INPUT_VALUE}/>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
