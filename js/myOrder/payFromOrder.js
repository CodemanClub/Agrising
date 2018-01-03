import React, { Component } from 'react';
import {WebView} from 'react-native';



export default class PayFromOrder extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
        <WebView
            source={{uri: 'https://api.agrising.com/alipayFromOrder/'+params.item_id+'?token='+params.token}}
            javaScriptEnabled={true}
            mediaPlaybackRequiresUserAction={true}
            mixedContentMode="always"
          />
      );
    
  }
}