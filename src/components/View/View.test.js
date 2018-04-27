import chai from 'chai';
import React from 'react';
import View from './View.jsx';
import Feed from  '../Feed/Feed.jsx';

import {shallow} from 'enzyme';

let expect = chai.expect;
describe('<View/>', ()=>{
	'use strict';

	let wrapper;
	beforeEach(() => {
    wrapper = shallow(<View />)
	});
	
	it('Renders one View', ()=>{
		expect(wrapper.find('.view')).to.have.length(1);
	});
	it('with <Feed />', ()=>{
		expect(wrapper.find(Feed)).to.have.length(1);
	});
});