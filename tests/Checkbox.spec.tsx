import * as React from 'react';
import { configure, shallow, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

import Checkbox from '../src/Checkbox';

describe('<Checkbox />', () => {
  it('renders checkbox', () => {
    const wrapper = shallow(<Checkbox checked />);
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('renders checkbox with the right default props', () => {
    const wrapper = mount(<Checkbox checked={false} />);
    const { checked, indeterminate, className } = wrapper.props();
    expect(checked).toEqual(false);
    expect(indeterminate).toEqual(false);
    expect(className).toEqual('');
  });

  it('renders checkbox with all props defined', () => {
    const wrapper = mount(<Checkbox checked indeterminate className="test-class" />);
    const { checked, indeterminate, className } = wrapper.props();
    expect(checked).toEqual(true);
    expect(indeterminate).toEqual(true);
    expect(className).toEqual('test-class');
  });
});
