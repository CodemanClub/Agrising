'use strict';
import {AsyncStorage} from 'react-native';

export function login(token){
	return {
		type : 'login',
		token : token
	}
}

export function logout(dispatch){
	AsyncStorage.clear()
	return {
		type : 'logout',
		token : null
	}
}

export function saveOrders(orders){
	return{
		type: 'saveOrders',
		orders: orders
	}
}

export function clearOrders(){
	return {
		type : 'clearOrders',
		orders : null
	}
}

export function buyItem(item){
	return {
		type:'BUY_ITEM',
		item:item
	}
}