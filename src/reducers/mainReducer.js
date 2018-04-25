import {combineReducers} from 'redux';
import {feedReducer} from './feedReducer';
import {modalReducer} from './modalReducer';

export const mainReducer = combineReducers({
	feed: feedReducer,
	modal: modalReducer,
});