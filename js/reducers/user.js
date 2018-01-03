'use strict';
const initialState = {
  islogin: false,
  token: null
}
export default function login (state=initialState, action){
  switch (action.type) {
    case 'login':
      return {
        ...state,
      	islogin:true,
      	token:action.token
      };
    case 'logout':
      return {
        islogin: false,
        token: null
      }
    default:
      return state;
  }
};