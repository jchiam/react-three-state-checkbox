import * as React from 'react';
import { configure, shallow, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

import Checkbox from '../Checkbox';

describe('<Checkbox />', () => {
  it('renders checkbox', () => {
    const wrapper = shallow(<Checkbox checked />);
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('renders checkbox with the right default props', () => {
    const wrapper = mount(<Checkbox checked={false} />);
    const { checked, indeterminate } = wrapper.props();
    expect(checked).toEqual(false);
    expect(indeterminate).toEqual(false);
  });

  it('renders checkbox with checked and indeterminate as true', () => {
    const wrapper = mount(<Checkbox checked indeterminate />);
    const { checked, indeterminate } = wrapper.props();
    expect(checked).toEqual(true);
    expect(indeterminate).toEqual(true);
  });
});
