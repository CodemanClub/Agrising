import React, { Component } from 'react';
import {WebView,View,Text,AsyncStorage,ActivityIndicator} from 'react-native';

export default class Express extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { params } = this.props.navigation.state;
    if (params.express_num) {
        return (
            <WebView
                source={{uri: 'https://m.kuaidi100.com/result.jsp?nu='+params.express_num}}
                javaScriptEnabled={true}
                mediaPlaybackRequiresUserAction={true}
                mixedContentMode="always"
                onLoadStart={()=>{return(
                  <ActivityIndicator/>
                )}}
              />
        );
    }else {
      return (
        <Text>还没有发货</Text>
      );
    }
    
  }
}