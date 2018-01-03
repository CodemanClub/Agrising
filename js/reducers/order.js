'use strict';

const initialState = {
  orders: null
}
export default function orderOpt (state=initialState, action){
	console.log(state)
  switch (action.type) {
    case 'saveOrders':
      return {
      	orders:action.orders,
      };
    case 'clearOrders':
      return {
      	orders:null
      }
    default:
      return state
  }
}