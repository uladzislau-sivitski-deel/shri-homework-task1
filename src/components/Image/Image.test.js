import chai from 'chai';
import React from 'react';
import Image from './Image.jsx';
import {shallow} from 'enzyme';

let expect = chai.expect;
describe('<Image/>', ()=>{
	'use strict';

	const image = {
		uri: 'uri'
	}

	let wrapper;
	beforeEach(() => {
    wrapper = shallow(<Image imageData = {image}/>)
	});
	
	it('Renders one Image', ()=>{
		expect(wrapper.find('.image')).to.have.length(1);
	});
	it('with <img>', ()=>{
		expect(wrapper.find('img')).to.have.length(1);
	});
	it('doesnt render w/o data', ()=>{
    wrapper = shallow(<Image/>)		
		expect(wrapper.find('.image')).to.have.length(0);
	});
});