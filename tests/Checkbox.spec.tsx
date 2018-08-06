import * as React from 'react';
import { configure, shallow, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

import Checkbox from '../src/Checkbox';

describe('<Checkbox />', () => {
  it('renders checkbox', () => {
    const tree = mount(<Checkbox checked />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders checkbox with the right default props', () => {
    const tree = mount(<Checkbox checked={false} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders checkbox with all props defined', () => {
    const tree = mount(<Checkbox checked indeterminate className="test-class" style={{ margin: 0 }} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
