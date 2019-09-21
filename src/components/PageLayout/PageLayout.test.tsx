import React from 'react';
import {shallow, render} from 'enzyme';
import {PageLayout} from './PageLayout';

const PAGE_CONTENT = 'Test';

describe('PageLayout', () => {
    it('Shallow render snapshots are equal', () => {
        const wrapper = shallow(<PageLayout>{PAGE_CONTENT}</PageLayout>);
        expect(wrapper).toMatchSnapshot();
    });

    it('Render snapshots are equal', () => {
        const wrapper = render(<PageLayout>{PAGE_CONTENT}</PageLayout>);
        expect(wrapper).toMatchSnapshot();
    });
});
