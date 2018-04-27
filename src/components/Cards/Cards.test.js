import chai from 'chai';
import React from 'react';
import Cards from './Cards.jsx';
import {shallow} from 'enzyme';

const cards = [
	{
		display_sizes: [{uri: 'uri'}],
		max_dimensions: {height: 1, width: 1}
	},
	{
		display_sizes: [{uri: 'uri'}],
		max_dimensions: {height: 1, width: 1}
	}
]

let expect = chai.expect;
describe('<Cards/>', ()=>{
	'use strict';

	it('renders array of cards', ()=>{
		const wrapper = shallow(<Cards cards={cards} />).dive();
		expect(wrapper.find('.card')).to.have.length(cards.length);
	});



});