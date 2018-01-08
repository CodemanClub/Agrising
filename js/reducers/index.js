'use strict';
import {combineReducers} from 'redux';

import Login from './user';
import orderOpt from './order';
import Buy_item from './buy'

const rootReducer = combineReducers({
	login:Login,
	order:orderOpt,
	buy_item:Buy_item
});
export default rootReducer;