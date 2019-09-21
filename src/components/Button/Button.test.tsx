import React from 'react';
import {shallow, render, mount} from 'enzyme';
import {spy} from 'sinon';
import {Button} from './Button';

const BUTTON_VALUE = 'Test value';

describe('Button', () => {
    it('Shallow render snapshots are equal', () => {
        const wrapper = shallow(
            <Button
                active={true}
                value={BUTTON_VALUE}
                onClick={() => {}}
            >
                Text
            </Button>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('Render snapshots are equal', () => {
        const wrapper = render(
            <Button
                active={true}
                value={BUTTON_VALUE}
                onClick={() => {}}
            >
                Text
            </Button>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('Click handler called once with exact argument', () => {
        const clickHandler = spy();
        const wrapper = mount(
            <Button
                active={true}
                value={BUTTON_VALUE}
                onClick={clickHandler}
            >
                Text
            </Button>
        );

        wrapper.find('div').first().simulate('click');

        expect(clickHandler.calledOnceWithExactly(BUTTON_VALUE)).toBe(true);
    });
});
