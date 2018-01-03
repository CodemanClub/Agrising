'use strict';
import {combineReducers} from 'redux';

import Login from './user';
import orderOpt from './order';

const rootReducer = combineReducers({
	login:Login,
	order:orderOpt
});
export default rootReducer;