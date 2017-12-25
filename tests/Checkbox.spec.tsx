import * as React from "react";
import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { spy } from "sinon";
import { expect } from "chai";

configure({ adapter: new Adapter() });

import Checkbox from "../Checkbox";

describe("<Checkbox />", () => {
  it("renders the checkbox", () => {
    const wrapper = shallow(<Checkbox checked />);
    expect(wrapper.find("input")).to.have.length(1);
  });
});
