'use strict';

const initialState = {
  item: null
}
export default function buyItem (state=initialState, action){
	console.log(state)
  switch (action.type) {
    case 'BUY_ITEM':
      return {
      	item:action.item,
      };
    default:
      return state;
  }
}