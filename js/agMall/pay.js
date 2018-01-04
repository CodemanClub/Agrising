import React, { Component } from 'react';
import {WebView} from 'react-native';
export default class Pay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { params } = this.props.navigation.state;
    const order = params.order;
    return (
        <WebView
          source={{uri: 'http://192.168.10.11/alipay/'+order.order_number+'/'+order.total_money+'/'+order.product_name}}
          javaScriptEnabled={true}
          mediaPlaybackRequiresUserAction={true}
          mixedContentMode="always"
        />
    );
    
  }
}