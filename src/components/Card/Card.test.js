import chai from 'chai';
import React from 'react';
import Card from './Card.jsx';
import {shallow} from 'enzyme';

const card = {
	display_sizes: [{uri: 'uri'}],
	max_dimensions: {height: 1, width: 1}
}

let expect = chai.expect;
describe('<Card/>', ()=>{
	'use strict';

	it('renders one card', ()=>{
		const wrapper = shallow(<Card card={card} />);
		expect(wrapper.find('.card')).to.have.length(1);
	});

	it('card has an image', ()=>{
		const wrapper = shallow(<Card card={card} />);
		expect(wrapper.find('.card__image')).to.have.length(1);
	});

});