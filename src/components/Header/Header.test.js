import chai from 'chai';
import React from 'react';
import Header from './Header.jsx';
import {shallow} from 'enzyme';

let expect = chai.expect;
describe('<Header/>', ()=>{
	'use strict';
	it('renders one <header> tag', ()=>{
		const wrapper = shallow(<Header />);
		expect(wrapper.find('header')).to.have.length(1);
	});
});