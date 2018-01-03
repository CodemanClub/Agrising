import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {Container,H1,H3,Radio,Button } from 'native-base';

import Swiper from 'react-native-swiper';

export default class ProductEntry extends Component{
	render(){

    const { params } = this.props.navigation.state;
    var imgs = params.item.swiper.split(",");
    // var size_price = JSON.parse(params.item.size_price)
		return(
		<Container>
		    <View style={styles.wrapper}>
	        <Swiper>
            <Image source={{uri: imgs[0]}} style={{height: 100, width: null, flex: 1}}/>
	          <Image source={{uri: imgs[1]}} style={{height: 100, width: null, flex: 1}}/>
	        </Swiper>
	      </View>
        <H1>{params.item.name}</H1>
        <H3>￥{params.item.min_price/100}</H3>
        <Text note>月销：{params.item.sold}</Text>
      {/*购物按钮*/}
       <View style={{width: 120, backgroundColor: commonStyle.red, alignItems: commonStyle.center, justifyContent: commonStyle.center, height: commonStyle.cellHeight}}>
        <Text>去结算({this.state.totalNum})</Text>
       </View>

		</Container>
		);
	}
}

var styles = StyleSheet.create({
  wrapper: {
    height:200,
    flexDirection: 'row',
    justifyContent: 'center',
    margin:5
  },
  button: {
    width:"100%"
  }
})