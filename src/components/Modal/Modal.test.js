import chai from 'chai';
import React from 'react';
import Modal from './Modal.jsx';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store'


const middlewares = [];
const mockStore = configureStore(middlewares);

const card = {
	display_sizes: [{uri: 'uri'}],
	max_dimensions: {height: 1, width: 1}
}

const store = mockStore({
	modal: {
		current: card,
		next: card,
		prev: card,
	},
	feed: {
		loading: false
	}
});

let expect = chai.expect;
describe('<Modal/>', ()=>{
	'use strict';

	let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Modal store={store}/>).dive();
  });
	
	it('Renders modal', () => {
		expect(wrapper.find('.modal')).to.have.length(1);
	});

	it('with overlay.', () => {
		expect(wrapper.find('.modal__overlay')).to.have.length(1);
	});

	it('Modal with prev has a prev link', () => {
		expect(wrapper.find('.modal__prev')).to.have.length(1);
	});

	it('Modal with next has a next link', () => {
		expect(wrapper.find('.modal__prev')).to.have.length(1);
	});

	it('Modal has a close link', () => {
		expect(wrapper.find('.modal__close')).to.have.length(1);
	});

	it('Modal without prev does not have prev link', () => {
		const store = mockStore({
			modal: {
				current: card,
				next: card,
			},
			feed: {
				loading: false
			}
		});
    wrapper = shallow(<Modal store={store}/>).dive();		
		expect(wrapper.find('.modal__prev')).to.have.length(0);
	});

	it('Modal without next does not have next link', () => {
		const store = mockStore({
			modal: {
				current: card,
				prev: card,
			},
			feed: {
				loading: false
			}
		});
    wrapper = shallow(<Modal store={store}/>).dive();		
		expect(wrapper.find('.modal__next')).to.have.length(0);
	});

	it('On load spinner should be displayed', () => {
		const store = mockStore({
			modal: {
				current: card,
				prev: card,
				next: card,
			},
			feed: {
				loading: true
			}
		});
    wrapper = shallow(<Modal store={store}/>).dive();		
		expect(wrapper.find('.loader__spinner')).to.have.length(1);
	});
});
