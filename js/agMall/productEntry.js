import React, { Component } from 'react';
import {WebView,View,Text,AsyncStorage,ActivityIndicator} from 'react-native';



export default class ProductEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {token:null}
  }

  componentDidMount = () => {
    try {
      AsyncStorage.getItem('token').then((res)=>{
        this.setState({
          token: res
        })
      });
    } catch (error) {
      console.log('productEntry页面的AsynacStorage出错了')
    }
  };

  render() {
    const { params } = this.props.navigation.state;
    if (this.state.token) {
        return (
            <WebView
                source={{uri: 'https://api.agrising.com/getProductById/'+params.id+'?token='+this.state.token}}
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
        <Text>请先登录</Text>
      );
    }
    
  }
}