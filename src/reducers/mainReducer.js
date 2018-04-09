import {combineReducers} from 'redux';
import {feedReducer} from './feedReducer';

export const mainReducer = combineReducers({
  feed: feedReducer
});