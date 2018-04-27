import chai from 'chai';
import React from 'react';
import Cards from './Cards.jsx';
import Loader from  '../Loader/Loader.jsx';
import Modal from  '../Modal/Modal.jsx';

import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store'


const middlewares = [];
const mockStore = configureStore(middlewares);
const cards = [
	{	id: 0,
		display_sizes: [{uri: 'uri'}],
		max_dimensions: {height: 1, width: 1}
	},
	{	id: 1,
		display_sizes: [{uri: 'uri'}],
		max_dimensions: {height: 1, width: 1}
	}
]
const store = mockStore({});

let expect = chai.expect;
describe('<Cards/>', ()=>{
	'use strict';

	let wrapper;
	
  beforeEach(() => {
    wrapper = shallow( <Cards cards={cards} store={store}/>).dive();;
  });
	
	it('renders <Loader /> for cards', () => {
		expect(wrapper.find(Loader)).to.have.length(1);
	});

	it('Cards are in Loader children', () => {
		expect(wrapper.find('.cards')).to.have.length(1);
	});

	it('<Modal /> is in Loader children', () => {
		expect(wrapper.find(Modal)).to.have.length(1);
	});

});
