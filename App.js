import React from "react";
import { StackNavigator } from "react-navigation";
import { Root } from "native-base";
import { createStore } from 'redux';
import {Provider} from 'react-redux';



import HomeScreen from './js/App';
import PediaScreen from './js/pedia';
import EntryDetailScreen from './js/pedia/entry_details';
import NewsScreen from './js/news';
import EntryNewsScreen from './js/news/entry_details';
import MeetingScreen from './js/meeting';
import VideoPlayerScreen from './js/meeting/videoPlayer';
import AgMallScreen from './js/agMall';
import ProductScreen from './js/agMall/productEntry';
import MyScreen from './js/my';
import PayFromOrderScreen from './js/myOrder/payFromOrder';
import OrderDetailScreen from './js/myOrder/orderDetail';
import ExpressLookScreen from './js/myOrder/express';
import QuotationScreen from './js/quotation';
import CartScreen from './js/my/cart';
import ConfirmOrderScreen from './js/agMall/confirmOrder';
import PayScreen from './js/agMall/pay';
import AddAddressScreen from './js/agMall/addAddress';
import SelectAddressScreen from './js/agMall/selectAddress';


const App = StackNavigator({
  Home: { screen: HomeScreen },
  Pedia: { screen: PediaScreen },
  EntryDetail: { screen: EntryDetailScreen },
  News: {screen: NewsScreen},
  EntryNews: {screen: EntryNewsScreen},
  Meeting: {screen: MeetingScreen},
  VideoPlayer:{screen: VideoPlayerScreen},
  AgMall:{screen: AgMallScreen},
  Product:{screen: ProductScreen},
  My:{screen:MyScreen},
  PayFromOrder:{screen:PayFromOrderScreen},
  OrderDetail:{screen:OrderDetailScreen},
  ExpressLook:{screen:ExpressLookScreen},
  Quotation:{screen:QuotationScreen},
  Cart:{screen:CartScreen},
  ConfirmOrder:{screen:ConfirmOrderScreen},
  Pay:{screen:PayScreen},
  AddAddress:{screen:AddAddressScreen},
  SelectAddress:{screen:SelectAddressScreen}
},
{
  initialRouteName: "Home",
}
);

import rootReducer from './js/reducers'
const store = createStore(rootReducer);
export default () =>
    <Root>
      <Provider store={store}>
        <App />
      </Provider>
    </Root>;
